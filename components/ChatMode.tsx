import { Message } from "@/app/(tabs)";
import { useEffect, useRef } from "react";
import { Keyboard, ScrollView, StyleSheet } from "react-native";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export { ChatMode };

interface ChatModeProps {
  messages: Message[];
  isTyping: boolean;
  sound: boolean;
  currentSpeakingId: string | null;
  handleSpeak: (message: Message) => Promise<void>;
  handleStopSpeaking: () => Promise<void>;
  handleFinishedWritten: (index: number) => void;
}

function ChatMode({
  messages,
  isTyping,
  sound,
  currentSpeakingId,
  handleSpeak,
  handleStopSpeaking,
  handleFinishedWritten,
}: ChatModeProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  function scrollToBottom() {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", scrollToBottom);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.messagesContainer}
      contentContainerStyle={styles.messagesContent}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          sound={sound}
          isSpeaking={currentSpeakingId === message.id}
          onSpeak={() => handleSpeak(message)}
          onStop={handleStopSpeaking}
          handleFinishedWritten={() => handleFinishedWritten(index)}
        />
      ))}
      {isTyping && <TypingIndicator />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 20,
  },
});
