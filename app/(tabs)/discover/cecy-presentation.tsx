import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CecyPresentationScreen() {
  const cecyFeatures = [
    {
      title: "Apoyo 24/7",
      description: "Estoy disponible cuando me necesites, día y noche",
      icon: <Feather name="clock" size={24} color="#53AB32" />,
    },
    {
      title: "Conversación Natural",
      description: "Puedes hablar conmigo como lo harías con un amigo",
      icon: <Feather name="message-circle" size={24} color="#F19433" />,
    },
    {
      title: "Información Confiable",
      description: "Te proporciono información verificada por profesionales",
      icon: <MaterialIcons name="verified" size={24} color="#45AAE3" />,
    },
    {
      title: "Privacidad Garantizada",
      description: "Nuestras conversaciones son completamente privadas",
      icon: <Feather name="shield" size={24} color="#E74889" />,
    },
  ];

  const helpTopics = [
    "Problemas de bullying o acoso escolar",
    "Ansiedad y estrés académico",
    "Dudas sobre salud sexual",
    "Prevención de adicciones",
    "Apoyo emocional y bienestar mental",
    "Orientación para tomar decisiones",
  ];

  const conversationTips = [
    {
      tip: "Sé honesto/a",
      description: "Comparte lo que realmente sientes, no hay juicios aquí",
      icon: <AntDesign name="heart" size={20} color="#E74889" />,
    },
    {
      tip: "Toma tu tiempo",
      description: "No hay prisa, puedes escribir a tu ritmo",
      icon: <Feather name="clock" size={20} color="#F19433" />,
    },
    {
      tip: "Haz preguntas",
      description: "Cualquier duda que tengas es válida e importante",
      icon: <Feather name="help-circle" size={20} color="#45AAE3" />,
    },
    {
      tip: "Usa tu voz",
      description: "También puedes enviar mensajes de voz si prefieres",
      icon: <Feather name="mic" size={20} color="#53AB32" />,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <LinearGradient colors={["#53AB32", "#A6CD38"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Conoce a Cecy</Text>
            <Text style={styles.headerSubtitle}>
              Tu compañera de apoyo y orientación
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Presentación Principal */}
        <View style={styles.introSection}>
          <View style={styles.introCard}>
            <View style={styles.mascotContainer}>
              <Image
                source={require("@/assets/images/CecyApp.jpg")}
                style={styles.cecyImage}
                resizeMode="cover"
              />
              <View style={styles.mascotBadge}>
                <Text style={styles.mascotText}>Cecy & Ocelote</Text>
              </View>
            </View>
            <Text style={styles.introTitle}>¡Hola! Soy Cecy</Text>
            <Text style={styles.introText}>
              {/* Soy tu asistente virtual diseñada especialmente para apoyarte en
              tu desarrollo personal y académico. Junto a mi compañero Ocelote,
              estamos aquí para escucharte, orientarte y acompañarte en los
              momentos que más lo necesites. */}
              ¡Hola! Tengo 17 años, mi celular es mi mejor amigo y ¡últimamente
              no puedo dejar de ver TikTok! Me encanta estar al tanto de lo que
              pasa en las redes. Pero además, soy tu asistente virtual, diseñada
              especialmente para apoyarte en tu desarrollo personal y académico.
              Junto a mi compañero Ocelote, estamos aquí para escucharte,
              orientarte y acompañarte en los momentos que más lo necesites.
            </Text>
          </View>
        </View>

        {/* Características */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo puedo ayudarte?</Text>
          <View style={styles.featuresGrid}>
            {cecyFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Temas de ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temas en los que te apoyo</Text>
          <View style={styles.topicsCard}>
            <View style={styles.topicsHeader}>
              <MaterialIcons name="psychology" size={24} color="#53AB32" />
              <Text style={styles.topicsTitle}>
                Puedes hablar conmigo sobre:
              </Text>
            </View>
            {helpTopics.map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <AntDesign name="checkcircleo" size={16} color="#53AB32" />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Consejos para conversar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consejos para nuestra charla</Text>
          <View style={styles.tipsContainer}>
            {conversationTips.map((item, index) => (
              <View key={index} style={styles.tipCard}>
                <View style={styles.tipIconContainer}>{item.icon}</View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{item.tip}</Text>
                  <Text style={styles.tipDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Mensaje de seguridad */}
        <View style={styles.safetySection}>
          <View style={styles.safetyCard}>
            <Feather name="shield" size={32} color="#45AAE3" />
            <Text style={styles.safetyTitle}>Tu seguridad es lo primero</Text>
            <Text style={styles.safetyText}>
              Recuerda que aunque estoy aquí para apoyarte, si tienes una
              emergencia o necesitas ayuda profesional inmediata, es importante
              que contactes a un adulto de confianza o a los servicios de
              emergencia.
            </Text>
          </View>
        </View>

        {/* Botón para empezar a chatear */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push("/(tabs)")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#53AB32", "#A6CD38"]}
            style={styles.chatButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Feather name="message-circle" size={20} color="#FFFFFF" />
            <Text style={styles.chatButtonText}>Empezar a chatear</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: Platform.OS == "android" ? 0 : 0,
    paddingTop:
      Platform.OS == "android" ? (StatusBar.currentHeight ?? 30) + 10 : 50,
    paddingBottom: 15,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E2E8F0",
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  introSection: {
    marginBottom: 32,
  },
  introCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mascotContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  cecyImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#53AB32",
  },
  mascotBadge: {
    backgroundColor: "#53AB32",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mascotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
    textAlign: "center",
  },
  introText: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 6,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16,
  },
  topicsCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  topicsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#166534",
    marginLeft: 12,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  topicText: {
    fontSize: 14,
    color: "#15803D",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  safetySection: {
    marginBottom: 32,
  },
  safetyCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  safetyText: {
    fontSize: 14,
    color: "#1D4ED8",
    lineHeight: 22,
    textAlign: "center",
  },
  chatButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  chatButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});
