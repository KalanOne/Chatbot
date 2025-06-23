import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4BA6E0" />
      
      <LinearGradient
        colors={["#4BA6E0", "#456AE3", "#4F46E5"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <AntDesign name="message1" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>CecyteBot</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <View style={styles.mascotContainer}>
                <View style={styles.mascotBadge}>
                  <Text style={styles.mascotText}>🐆 Cecy & Jaguar</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>¡Bienvenid@ a</Text>
            <Text style={styles.appTitle}>Cecy te orienta!</Text>
            <Text style={styles.subtitle}>
              Tu espacio seguro para fortalecer tus habilidades y tomar
              decisiones informadas para tu futuro
            </Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Feather name="message-circle" size={20} color="#4F46E5" />
                </View>
                <Text style={styles.featureText}>Chat de apoyo 24/7</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Feather name="book-open" size={20} color="#10B981" />
                </View>
                <Text style={styles.featureText}>Recursos educativos</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Feather name="shield" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.featureText}>Información confiable</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.replace("/(tabs)")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#10B981", "#059669"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Iniciemos</Text>
              <Feather name="arrow-right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.privacyContainer}>
            <Feather name="lock" size={16} color="#FFFFFF" />
            <Text style={styles.privacyText}>
              Tu privacidad y seguridad son nuestra prioridad
            </Text>
          </View>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: "relative",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.7,
    height: height * 0.35,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
    padding: 16,
  },
  mascotContainer: {
    alignItems: "center",
  },
  mascotBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mascotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#E2E8F0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  startButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  privacyText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft: 8,
    textAlign: "center",
  },
  decorativeCircle1: {
    position: "absolute",
    top: height * 0.1,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: height * 0.3,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  decorativeCircle3: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
});