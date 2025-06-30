import React from "react";
import { StyleSheet, View } from "react-native";
import { ThinkingDot } from "./ThinkingDot";

export { TypingIndicator };

function TypingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          {/* <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} /> */}
          <ThinkingDot delay={0} />
          <ThinkingDot delay={200} />
          <ThinkingDot delay={400} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
