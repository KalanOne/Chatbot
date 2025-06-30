import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { authService } from "@/services/auth.service"
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useEffect(() => {
    // Handle deep linking for authentication
    const handleDeepLink = (url: string) => {
      authService.handleAuthRedirect(url);
    };

    // Listen for incoming links
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}