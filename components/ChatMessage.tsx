import { Message } from "@/app/(tabs)";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export { ChatMessage };

interface ChatMessageProps {
  message: Message;
  sound: boolean;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
  handleFinishedWritten: () => void;
}

function ChatMessage({
  message,
  sound,
  isSpeaking,
  onSpeak,
  onStop,
  handleFinishedWritten,
}: ChatMessageProps) {
  const [displayText, setDisplayText] = useState("");
  const [showTyping, setShowTyping] = useState(!message.isUser);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalDuration = 3000;

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 });

    if (!message.isUser && !message.written) {
      currentIndexRef.current = 0;
      const totalChars = message.text.length;
      const typingSpeed = totalChars > 0 ? totalDuration / totalChars : 0;

      if (sound) onSpeak();

      const typeText = () => {
        if (currentIndexRef.current < totalChars) {
          setDisplayText(
            message.text.substring(0, currentIndexRef.current + 1)
          );
          currentIndexRef.current++;
          timeoutRef.current = setTimeout(typeText, typingSpeed);
        } else {
          setShowTyping(false);
          handleFinishedWritten(); // ✅ Marcar como terminado
        }
      };

      timeoutRef.current = setTimeout(typeText, 500);
    } else {
      setDisplayText(message.text);
      setShowTyping(false);
    }

    return () => {
      // if (!message.isUser && isSpeaking) {
      //   onStop();
      // }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [message.text, message.isUser]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!message.isUser && !message.written) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setDisplayText(message.text);
          setShowTyping(false);
          handleFinishedWritten();
        }
      };
    }, [message.text, message.written])
  );

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={[
          styles.messageContainer,
          message.isUser
            ? styles.userMessageContainer
            : styles.botMessageContainer,
        ]}
      >
        <View style={styles.messageContainerIcon}>
          {!message.isUser && (
            <Image
              source={require("@/assets/images/CecyApp.jpg")}
              style={{ width: 30, height: 30, borderRadius: 12 }}
            />
          )}
          <View
            style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userText : styles.botText,
              ]}
            >
              {displayText}
              {showTyping && <Text style={styles.cursor}>|</Text>}
            </Text>
          </View>
          {message.isUser && (
            <Image
              source={require("@/assets/images/OzzyFeliz2.jpg")}
              style={{ width: 30, height: 30, borderRadius: 12 }}
            />
          )}
        </View>
        <View style={styles.timeStampReproducerContainer}>
          {!message.isUser && sound && (
            <TouchableOpacity
              onPress={isSpeaking ? onStop : onSpeak}
              style={styles.speechButton}
            >
              <AntDesign
                name={isSpeaking ? "pausecircle" : "play"}
                size={16}
                color="#4F46E5"
              />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.timestamp,
              message.isUser ? styles.userTimestamp : styles.botTimestamp,
            ]}
          >
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedViewContainer: {
    flexDirection: "row",
    gap: 5,
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  botMessageContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    minHeight: 44,
    justifyContent: "center",
  },
  userBubble: {
    backgroundColor: "#F19433",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  botText: {
    color: "#1E293B",
  },
  cursor: {
    opacity: 0.7,
    fontWeight: "300",
  },
  timeStampReproducerContainer: {
    marginTop: 4,
    marginStart: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 12,
  },
  userTimestamp: {
    // color: "#64748B",
    color: "#94A3B8",
    textAlign: "right",
    marginEnd: 38,
  },
  botTimestamp: {
    color: "#94A3B8",
    textAlign: "left",
    // marginStart: 4,
  },
  messageContainerIcon: {
    flexDirection: "row",
    alignContent: "flex-end",
    alignItems: "flex-end",
    gap: 5,
  },
  speechButton: {
    padding: 4,
  },
});
