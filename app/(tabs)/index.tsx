import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { getChatResponse } from "@/api/chat.api";
import { ChatMode } from "@/components/ChatMode";
import { CecyVisualMode } from "@/components/CecyVisualMode";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { AuthButton } from "@/components/AuthButton";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { generateUUIDv4 } from "@/utils/uuid";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "expo-router";
import * as Speech from "expo-speech";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  written: boolean;
}

export default function ChatScreen() {
  const { user } = useAuth();
  const { currentChat, messages: dbMessages, addMessage, loading: chatLoading, error: chatError } = useChat();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateUUIDv4(),
      text: "¡Hola! Estoy aquí para escucharte y apoyarte. Ya sea que estés lidiando con el acoso escolar, te sientas abrumado o simplemente necesites hablar con alguien, estoy aquí para ti. ¿Qué tienes en mente hoy?",
      isUser: false,
      timestamp: new Date(),
      written: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sound, setSound] = useState(true);
  const [chatMode, setChatMode] = useState(true);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const modeScaleAnim = useRef(new Animated.Value(1)).current;
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null
  );
  const [chat_id] = useState(generateUUIDv4());

  // Sync database messages with local messages
  useEffect(() => {
    if (dbMessages.length > 0) {
      const convertedMessages: Message[] = dbMessages.map(msg => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.sender_type === 'user',
        timestamp: new Date(msg.timestamp),
        written: true,
      }));
      
      // Keep the initial welcome message and add database messages
      setMessages(prev => {
        const welcomeMessage = prev[0];
        return [welcomeMessage, ...convertedMessages];
      });
    }
  }, [dbMessages]);

  // Show error if chat initialization fails
  useEffect(() => {
    if (chatError) {
      Alert.alert('Error', chatError);
    }
  }, [chatError]);

  async function sendMessage(text: string) {
    if (!text.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
      written: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    setIsUserTyping(false);

    try {
      // Save user message to database
      await addMessage(text.trim(), 'user', {
        platform: Platform.OS,
        timestamp: new Date().toISOString(),
      });

      const response = await getChatResponse({
        chat_id,
        mensaje: text,
      });

      const botMessage: Message = {
        id: generateUUIDv4(),
        text: response.respuesta,
        isUser: false,
        timestamp: new Date(),
        written: !chatMode,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save bot message to database
      await addMessage(response.respuesta, 'bot', {
        platform: Platform.OS,
        timestamp: new Date().toISOString(),
        originalChatId: chat_id,
      });
      
      // Auto-play audio in visual mode
      if (!chatMode && sound) {
        await handleSpeak(botMessage);
      }
    } catch (error) {
      const botMessageError: Message = {
        id: generateUUIDv4(),
        text: "Lo siento 😢, ocurrió un error al procesar tu mensaje.",
        isUser: false,
        timestamp: new Date(),
        written: !chatMode,
      };
      setMessages((prev) => [...prev, botMessageError]);

      // Save error message to database
      try {
        await addMessage(botMessageError.text, 'bot', {
          platform: Platform.OS,
          timestamp: new Date().toISOString(),
          error: true,
        });
      } catch (dbError) {
        console.error('Error saving error message to database:', dbError);
      }
      
      // Auto-play error message in visual mode
      if (!chatMode && sound) {
        await handleSpeak(botMessageError);
      }
    } finally {
      setIsTyping(false);
    }
  }

  function handleVoiceTranscription(transcription: string) {
    if (transcription) {
      setInputText(transcription);
    }
  }

  function handleSoundToggle() {
    setSound((prev) => {
      if (prev) {
        Speech.stop();
      }
      return !prev;
    });

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleModeToggle() {
    setChatMode((prev) => {
      const newMode = !prev;
      // Enable sound automatically when switching to visual mode
      if (!newMode && !sound) {
        setSound(true);
      }
      return newMode;
    });

    Animated.sequence([
      Animated.timing(modeScaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(modeScaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleFinishedWritten(index: number) {
    setMessages((prevMessages) => {
      const updated = [...prevMessages];
      updated[index] = { ...updated[index], written: true };
      return updated;
    });
  }

  function handleInputChange(text: string) {
    setInputText(text);
    setIsUserTyping(text.length > 0);
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  async function handleSpeak(message: Message) {
    if (!sound) return;

    if (currentSpeakingId) {
      await Speech.stop();
    }

    Speech.speak(message.text, {
      onStart: () => setCurrentSpeakingId(message.id),
      onDone: () => setCurrentSpeakingId(null),
      onStopped: () => setCurrentSpeakingId(null),
    });
  }

  async function handleStopSpeaking() {
    await Speech.stop();
    setCurrentSpeakingId(null);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"} style={styles.avoidcontainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <LinearGradient colors={["#F19433", "#f7ad44"]} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>
                {chatMode ? "Chat de Apoyo" : "Cecy Visual"}
              </Text>
              <Text style={styles.headerSubtitle}>
                {chatMode 
                  ? "Un espacio seguro para hablar" 
                  : "Interacción visual con Cecy"
                }
              </Text>
              {user && (
                <Text style={styles.userIndicator}>
                  Sesión guardada • {user.email}
                </Text>
              )}
            </View>
            <View style={styles.headerButtons}>
              <AuthButton />
              <TouchableOpacity
                onPress={handleModeToggle}
                style={styles.modeButton}
              >
                <Animated.View style={{ transform: [{ scale: modeScaleAnim }] }}>
                  <MaterialIcons
                    name={chatMode ? "visibility" : "chat"}
                    size={24}
                    color="#FFF"
                  />
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSoundToggle}
                style={styles.soundButton}
              >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <Feather
                    name={sound ? "volume-2" : "volume-x"}
                    size={24}
                    color="#FFF"
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {chatMode ? (
          <ChatMode
            messages={messages}
            isTyping={isTyping}
            sound={sound}
            currentSpeakingId={currentSpeakingId}
            handleSpeak={handleSpeak}
            handleStopSpeaking={handleStopSpeaking}
            handleFinishedWritten={handleFinishedWritten}
          />
        ) : (
          <CecyVisualMode
            messages={messages}
            isTyping={isTyping}
            currentSpeakingId={currentSpeakingId}
            isUserTyping={isUserTyping}
          />
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={handleInputChange}
              placeholder="Escriba su mensaje aquí..."
              placeholderTextColor="#94A3B8"
              multiline
              maxLength={500}
            />
            <VoiceRecorder
              onTranscription={handleVoiceTranscription}
              stopSpeaking={handleStopSpeaking}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() || chatLoading) && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || chatLoading}
            >
              <Feather
                name="send"
                size={20}
                color={(!inputText.trim() || chatLoading) ? "#94A3B8" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  avoidcontainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: Platform.OS == "android" ? 0 : 0,
    paddingTop:
      Platform.OS == "android" ? (StatusBar.currentHeight ?? 30) + 10 : 50,
    paddingBottom: 15,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E2E8F0",
    opacity: 0.9,
  },
  userIndicator: {
    fontSize: 12,
    color: "#E2E8F0",
    opacity: 0.8,
    marginTop: 2,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F1F5F9",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    maxHeight: 100,
    marginRight: 8,
    height: "100%",
  },
  sendButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#E2E8F0",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  soundButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});