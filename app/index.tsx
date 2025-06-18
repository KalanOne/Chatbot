import { NeoButton } from "@/components/NeoButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (sheetRef.current) {
        sheetRef.current.collapse();
      }
      return () => {
        if (sheetRef.current) {
          sheetRef.current.collapse();
        }
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <View style={styles.neoButtonContainer}>
        <NeoButton
          colors={["#C0D978", "#A5D656"]}
          colorText={"white"}
          onPress={() => {
            router.replace("/(tabs)");
          }}
        >
          Iniciemos
        </NeoButton>
      </View>
      <BottomSheet ref={sheetRef} handleIndicatorStyle={styles.indicatorStyle}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={[styles.headerTitle]}>¡Bienvenid@ a</Text>
          <Text style={[styles.headerTitle]}>Cecy te orienta!</Text>
          <Text style={[styles.welcomeTexts]}>
            Tu espacio para fortalecer tus habilidades y toma de deciciones
            informadas para tu futuro
          </Text>
          <NeoButton
            colors={["#C0D978", "#A5D656"]}
            colorText={"white"}
            onPress={() => {
              router.replace("/(tabs)");
            }}
          >
            Iniciemos
          </NeoButton>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4BA6E0",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#2F394B",
    marginBottom: 4,
    textAlign: "center",
  },
  welcomeTexts: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 4,
    color: "#B9B9BB",
  },
  indicatorStyle: {
    backgroundColor: "#F19433",
  },
  goButton: {
    paddingVertical: 20,
  },
  neoButtonContainer: {
    alignSelf: "center",
  },
});
