import { Stack } from "expo-router";

export default function DiscoverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addictions" />
      <Stack.Screen name="bullying" />
      <Stack.Screen name="mental-health" />
      <Stack.Screen name="sexual-health" />
      <Stack.Screen name="cecy-presentation" />
    </Stack>
  );
}