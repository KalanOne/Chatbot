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
      <StatusBar barStyle="light-content" backgroundColor="#45AAE3" />
      
      <LinearGradient
        colors={["#45AAE3", "#53AB32"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <AntDesign name="message1" size={28} color="#FFFFFF" />
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
                uri: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.imageOverlay}
            >
              <View style={styles.mascotContainer}>
                <View style={styles.mascotBadge}>
                  <Text style={styles.mascotText}>🐆 Cecy & Jaguar</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>¡Bienvenid@ a</Text>
            <Text style={styles.appTitle}>Cecy te orienta!</Text>
            <Text style={styles.subtitle}>
              Tu espacio seguro para fortalecer tus habilidades y tomar
              decisiones informadas para tu futuro
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#F19433" }]}>
                <Feather name="message-circle" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Chat de apoyo 24/7</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#53AB32" }]}>
                <Feather name="book-open" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Recursos educativos</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: "#E74889" }]}>
                <Feather name="shield" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>Información confiable</Text>
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
              colors={["#A6CD38", "#53AB32"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Iniciemos</Text>
              <Feather name="arrow-right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.privacyContainer}>
            <Feather name="lock" size={14} color="#FFFFFF" />
            <Text style={styles.privacyText}>
              Tu privacidad y seguridad son nuestra prioridad
            </Text>
          </View>
        </View>

        {/* Decorative Elements */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.65,
    height: height * 0.32,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
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
    height: "40%",
    justifyContent: "flex-end",
    padding: 16,
  },
  mascotContainer: {
    alignItems: "center",
  },
  mascotBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mascotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 2,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#E8F4FD",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  featuresContainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  startButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.85,
  },
  privacyText: {
    fontSize: 11,
    color: "#FFFFFF",
    marginLeft: 6,
    textAlign: "center",
  },
  decorativeCircle: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 50,
  },
  circle1: {
    top: height * 0.15,
    right: -40,
    width: 80,
    height: 80,
  },
  circle2: {
    bottom: height * 0.35,
    left: -25,
    width: 50,
    height: 50,
  },
  circle3: {
    top: height * 0.45,
    left: width * 0.15,
    width: 30,
    height: 30,
  },
});