import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import * as Haptics from "expo-haptics";
import mime from "mime";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { getTextFromSpeech } from "@/api/voiceRecorder.api";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export { VoiceRecorder };

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  stopSpeaking: (() => void) | (() => Promise<void>);
}

function VoiceRecorder({ onTranscription, stopSpeaking }: VoiceRecorderProps) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const [granted, setGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
    transform: [{ scale: scale.value * 1.5 }],
  }));

  const animatedLoaderProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    (async () => {
      const { granted } = await AudioModule.getRecordingPermissionsAsync();
      setGranted(granted);
    })();
  }, []);

  useEffect(() => {
    scale.value = isRecording
      ? withRepeat(withTiming(1.2, { duration: 800 }), -1, true)
      : withSpring(1);
    pulseOpacity.value = isRecording
      ? withRepeat(withTiming(0.3, { duration: 800 }), -1, true)
      : withTiming(0);
  }, [isRecording]);

  useEffect(() => {
    rotation.value = isLoading
      ? withRepeat(withTiming(360, { duration: 1000 }), -1)
      : 0;
  }, [isLoading]);

  const requestPermissions = async (): Promise<boolean> => {
    const { granted } = await AudioModule.requestRecordingPermissionsAsync();
    if (!granted)
      Alert.alert("Permisos requeridos", "Acceso al micrófono denegado.");
    setGranted(granted);
    return granted;
  };

  const record = async () => {
    await stopSpeaking?.();
    await audioRecorder.prepareToRecordAsync();
    try {
      if (Platform.OS == "android") {
        await Haptics.performAndroidHapticsAsync(
          Haptics.AndroidHaptics.Toggle_On
        );
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    } catch (error) {}
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setIsRecording(false);
      try {
        if (Platform.OS == "android") {
          await Haptics.performAndroidHapticsAsync(
            Haptics.AndroidHaptics.Toggle_Off
          );
        } else {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
      } catch (error) {}

      const { uri } = audioRecorder;
      if (!uri) return Alert.alert("Error", "No se detectó audio grabado");

      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: mime.getType(uri) || "audio/mpeg",
        name: `audio.${uri.split(".").pop()}`,
      } as any);

      const response = await getTextFromSpeech({ data: formData });
      onTranscription(response.transcription);
    } catch (error) {
      let backendMessage = "No se pudo procesar el audio, intentelo más tarde";
      // if (error instanceof AxiosError && error.response) {
      //   if ("error" in error.response.data) {
      //     backendMessage = error.response.data.error;
      //   } else {
      //     backendMessage = error.response.statusText;
      //   }
      // }
      Alert.alert("Error", backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (isLoading) return;

    if (!granted && !(await requestPermissions())) return;

    isRecording ? stopRecording() : record();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={toggleRecording}
      disabled={isLoading}
    >
      <Animated.View style={[styles.pulseCircle, animatedPulseStyle]} />
      <Animated.View
        style={[
          styles.recordButton,
          isRecording && styles.recordingButton,
          isLoading && styles.processingButton,
          animatedButtonStyle,
        ]}
      >
        {isLoading ? (
          <Animated.View
            style={[
              { alignItems: "center", justifyContent: "center" },
              animatedLoaderProps,
            ]}
          >
            <AntDesign name="loading1" size={20} color="#64748B" />
          </Animated.View>
        ) : isRecording ? (
          <Feather name="mic-off" size={20} color="white" />
        ) : (
          <Feather name="mic" size={20} color="#64748B" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  recordingButton: {
    backgroundColor: "#EF4444",
  },
  processingButton: {
    backgroundColor: "#F1F5F9",
  },
  pulseCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EF4444",
  },
});
