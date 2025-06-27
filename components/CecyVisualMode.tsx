import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from "react-native-reanimated";
import { Message } from "@/app/(tabs)";

export { CecyVisualMode };

interface CecyVisualModeProps {
  messages: Message[];
  isTyping: boolean;
  currentSpeakingId: string | null;
  isUserTyping: boolean;
}

type CecyState = "waiting" | "thinking" | "speaking";

const { width, height } = Dimensions.get("window");

function CecyVisualMode({
  messages,
  isTyping,
  currentSpeakingId,
  isUserTyping,
}: CecyVisualModeProps) {
  const [cecyState, setCecyState] = useState<CecyState>("waiting");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);
  const cecyContainerRef = useRef<View>(null);

  // Animation values
  const floatAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);
  const glowAnimation = useSharedValue(0);
  const thoughtBubbleScale = useSharedValue(0);

  // Determine Cecy's current state
  useEffect(() => {
    if (isTyping) {
      setCecyState("thinking");
    } else if (currentSpeakingId) {
      setCecyState("speaking");
      // Get the current speaking message
      const speakingMessage = messages.find(m => m.id === currentSpeakingId);
      if (speakingMessage) {
        setCurrentMessage(speakingMessage.text);
      }
    } else if (isUserTyping) {
      setCecyState("waiting");
    } else {
      setCecyState("waiting");
    }
  }, [isTyping, currentSpeakingId, isUserTyping, messages]);

  // Handle keyboard events to center Cecy
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        
        // Calculate the position to center Cecy considering the keyboard
        setTimeout(() => {
          if (cecyContainerRef.current && scrollViewRef.current) {
            cecyContainerRef.current.measureInWindow((x, y, width, height) => {
              const availableHeight = Dimensions.get("window").height - keyboardHeight;
              const cecyCenter = y + height / 2;
              const targetCenter = availableHeight / 2;
              const scrollOffset = cecyCenter - targetCenter + 300;
              
              scrollViewRef.current?.scrollTo({
                y: Math.max(0, scrollOffset),
                animated: true,
              });
            });
          }
        }, 100);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Optionally scroll back to a default position when keyboard hides
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Start animations based on state
  useEffect(() => {
    // Floating animation (always active)
    floatAnimation.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 2000 }),
        withTiming(-10, { duration: 2000 })
      ),
      -1,
      true
    );

    switch (cecyState) {
      case "thinking":
        pulseAnimation.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 800 }),
            withTiming(0.9, { duration: 800 })
          ),
          -1,
          true
        );
        thoughtBubbleScale.value = withTiming(1, { duration: 300 });
        glowAnimation.value = withRepeat(
          withTiming(1, { duration: 1000 }),
          -1,
          true
        );
        break;

      case "speaking":
        pulseAnimation.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 400 }),
            withTiming(0.98, { duration: 400 })
          ),
          -1,
          true
        );
        thoughtBubbleScale.value = withTiming(0, { duration: 200 });
        glowAnimation.value = withRepeat(
          withTiming(1, { duration: 600 }),
          -1,
          true
        );
        break;

      case "waiting":
        pulseAnimation.value = withTiming(1, { duration: 500 });
        thoughtBubbleScale.value = withTiming(0, { duration: 200 });
        glowAnimation.value = withTiming(0, { duration: 500 });
        break;
    }
  }, [cecyState]);

  // Animated styles
  const cecyContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatAnimation.value },
      { scale: pulseAnimation.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnimation.value, [0, 1], [0.3, 0.8]),
    transform: [
      { scale: interpolate(glowAnimation.value, [0, 1], [1, 1.2]) },
    ],
  }));

  const thoughtBubbleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thoughtBubbleScale.value }],
    opacity: thoughtBubbleScale.value,
  }));

  const getStateMessage = () => {
    switch (cecyState) {
      case "thinking":
        return "Pensando...";
      case "speaking":
        return "Hablando contigo";
      case "waiting":
        return "Esperando tu mensaje";
      default:
        return "";
    }
  };

  const getStateColor = () => {
    switch (cecyState) {
      case "thinking":
        return "#F59E0B";
      case "speaking":
        return "#53AB32";
      case "waiting":
        return "#94A3B8";
      default:
        return "#94A3B8";
    }
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Background gradient effect */}
      <View style={[styles.backgroundGlow, { backgroundColor: getStateColor() }]} />
      
      {/* Decorative elements */}
      <View style={styles.decorativeElements}>
        <FloatingParticle delay={0} color="#53AB32" position={{ top: "15%", left: "10%" }} />
        <FloatingParticle delay={1000} color="#F19433" position={{ top: "25%", right: "15%" }} />
        <FloatingParticle delay={2000} color="#45AAE3" position={{ top: "35%", left: "20%" }} />
        <FloatingParticle delay={1500} color="#E74889" position={{ top: "45%", right: "25%" }} />
      </View>

      {/* Main content container */}
      <View style={styles.mainContent}>
        {/* Main Cecy container with ref for measuring */}
        <View 
          ref={cecyContainerRef}
          style={styles.cecyMainContainer}
        >
          {/* Glow effect */}
          <Animated.View style={[styles.glowEffect, glowStyle]}>
            <View style={[styles.glowCircle, { backgroundColor: getStateColor() }]} />
          </Animated.View>

          {/* Cecy image container */}
          <Animated.View style={[styles.cecyContainer, cecyContainerStyle]}>
            <View style={styles.cecyImageWrapper}>
              <Image
                source={require("@/assets/images/CecyApp.jpg")}
                style={styles.cecyImage}
                resizeMode="cover"
              />
              
              {/* State indicator ring */}
              <View style={[styles.stateRing, { borderColor: getStateColor() }]} />
            </View>
          </Animated.View>

          {/* Thought bubble for thinking state */}
          <Animated.View style={[styles.thoughtBubble, thoughtBubbleStyle]}>
            <View style={styles.thoughtBubbleContent}>
              <View style={styles.thinkingDots}>
                <ThinkingDot delay={0} />
                <ThinkingDot delay={200} />
                <ThinkingDot delay={400} />
              </View>
            </View>
            <View style={styles.thoughtBubbleTail} />
          </Animated.View>
        </View>

        {/* State information */}
        <View style={styles.stateInfo}>
          <View style={[styles.stateIndicator, { backgroundColor: getStateColor() }]} />
          <Text style={[styles.stateText, { color: getStateColor() }]}>
            {getStateMessage()}
          </Text>
        </View>

        {/* Current message display (when speaking) */}
        {cecyState === "speaking" && currentMessage && (
          <View style={styles.messageDisplay}>
            <Text style={styles.messageText} numberOfLines={4}>
              "{currentMessage}"
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Thinking dots component
function ThinkingDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.3, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.thinkingDot, animatedStyle]} />;
}

// Floating particle component
function FloatingParticle({ 
  delay, 
  color, 
  position 
}: { 
  delay: number; 
  color: string; 
  position: { top?: string; left?: string; right?: string; bottom?: string };
}) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 3000 }),
        withTiming(15, { duration: 3000 })
      ),
      -1,
      true
    );
    
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[
        styles.particle, 
        animatedStyle, 
        { backgroundColor: color },
        position
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height * 0.8, // Aumentado para dar más espacio de scroll
  },
  backgroundGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60, // Aumentado para mejor centrado
    paddingHorizontal: 20,
    minHeight: height * 0.8,
  },
  cecyMainContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 30,
  },
  glowEffect: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  glowCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.2,
  },
  cecyContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  cecyImageWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cecyImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  stateRing: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderStyle: "dashed",
  },
  thoughtBubble: {
    position: "absolute",
    top: -70,
    right: -50,
    zIndex: 3,
  },
  thoughtBubbleContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  thoughtBubbleTail: {
    position: "absolute",
    bottom: -8,
    left: 15,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",
  },
  thinkingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  thinkingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#94A3B8",
    marginHorizontal: 2,
  },
  stateInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  stateIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  stateText: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageDisplay: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    maxWidth: width - 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  messageText: {
    fontSize: 15,
    color: "#1E293B",
    lineHeight: 22,
    textAlign: "center",
    fontStyle: "italic",
  },
  decorativeElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  particle: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});