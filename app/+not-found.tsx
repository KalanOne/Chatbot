import { Link, Stack } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.text}>Esta pantalla no existe.</Text>
        <Link href="/" style={styles.link}>
          <Text>¡Vaya a la pantalla de inicio!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
