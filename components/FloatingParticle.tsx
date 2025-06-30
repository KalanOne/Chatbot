import { useEffect } from "react";
import { DimensionValue, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export { FloatingParticle };

/**
 * Floating particle component
 * The `delay` prop should be used to delay the start of the animation for each particle,
 * so their animations are out of phase and look more natural.
 * You can achieve this by using setTimeout to start the animation after the delay.
 */
function FloatingParticle({
  delay,
  color,
  position,
}: {
  delay: number;
  color: string;
  position: {
    top?: DimensionValue | undefined;
    left?: DimensionValue | undefined;
    right?: DimensionValue | undefined;
    bottom?: DimensionValue | undefined;
  };
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
        position,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
