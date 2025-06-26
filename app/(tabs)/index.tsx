import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { getChatResponse } from "@/api/chat.api";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { generateUUIDv4 } from "@/utils/uuid";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";
import * as Speech from "expo-speech";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateUUIDv4(),
      text: "¡Hola! Estoy aquí para escucharte y apoyarte. Ya sea que estés lidiando con el acoso escolar, te sientas abrumado o simplemente necesites hablar con alguien, estoy aquí para ti. ¿Qué tienes en mente hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sound, setSound] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null
  );
  const [chat_id] = useState(generateUUIDv4());

  function scrollToBottom() {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await getChatResponse({
        chat_id,
        mensaje: text,
      });
      const botMessage: Message = {
        id: generateUUIDv4(),
        text: response.respuesta,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessageError: Message = {
        id: generateUUIDv4(),
        text: "Lo siento 😢, ocurrió un error al procesar tu mensaje.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessageError]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleVoiceTranscription(transcription: string) {
    if (transcription) {
      // sendMessage(transcription);
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

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", scrollToBottom);

    return () => {
      listener.remove();
    };
  }, []);

  const handleSpeak = async (message: Message) => {
    if (!sound) return;

    // Detener reproducción anterior si existe
    if (currentSpeakingId) {
      await Speech.stop();
    }

    // Reproducir nuevo mensaje
    Speech.speak(message.text, {
      // language: "es",
      onStart: () => setCurrentSpeakingId(message.id),
      onDone: () => setCurrentSpeakingId(null),
      onStopped: () => setCurrentSpeakingId(null),
    });
  };

  const handleStopSpeaking = async () => {
    await Speech.stop();
    setCurrentSpeakingId(null);
  };

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
              <Text style={styles.headerTitle}>Chat de Apoyo</Text>
              <Text style={styles.headerSubtitle}>
                Un espacio seguro para hablar
              </Text>
            </View>
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
        </LinearGradient>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              sound={sound}
              isSpeaking={currentSpeakingId === message.id}
              onSpeak={() => handleSpeak(message)}
              onStop={handleStopSpeaking}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            {/* <TouchableOpacity
              onPress={handleSoundToggle}
              style={styles.soundButtonInput}
            >
              <Feather
                name={sound ? "volume-2" : "volume-x"}
                size={20}
                color={sound ? "#94A3B8" : "#94A3B8"}
              />
            </TouchableOpacity> */}
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
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
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <Feather
                name="send"
                size={20}
                color={!inputText.trim() ? "#94A3B8" : "#FFFFFF"}
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 20,
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
  ////
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  soundButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  soundButtonInput: {
    padding: 8,
    marginRight: 8,
    alignSelf: "center",
  },
});
