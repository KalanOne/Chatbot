import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function MentalHealthScreen() {
  const faqData: FAQItem[] = [
    {
      question: "¿Qué es la salud mental?",
      answer:
        "Se refiere al bienestar emocional, psicológico y social que permite a las personas enfrentar los desafíos de la vida, desarrollar sus habilidades y contribuir a su comunidad. Es un estado de equilibrio entre las personas y su entorno, que afecta cómo pensamos, sentimos, actuamos y reaccionamos ante situaciones de estrés.",
      icon: <FontAwesome5 name="brain" size={24} color="#8B5CF6" />,
    },
    {
      question: "¿Qué es un problema de salud mental?",
      answer:
        "Es una alteración en los pensamientos, emociones o comportamientos que causa malestar o interfiere en la vida diaria. Ejemplos incluyen ansiedad, depresión, trastornos alimenticios, entre otros.",
      icon: <MaterialIcons name="help-outline" size={24} color="#8B5CF6" />,
    },
    {
      question: "¿Qué es la depresión?",
      answer:
        "Es un trastorno del estado de ánimo que provoca sentimientos persistentes de tristeza, pérdida de interés y una disminución general de la energía. Puede afectar el sueño, apetito y concentración.",
      icon: <Feather name="cloud-rain" size={24} color="#8B5CF6" />,
    },
    {
      question: "¿Qué es la ansiedad?",
      answer:
        "Es una respuesta natural al estrés, pero cuando es excesiva o constante, puede convertirse en un trastorno que afecta la vida cotidiana. Los síntomas incluyen nerviosismo, tensión y preocupación constante.",
      icon: <MaterialIcons name="psychology" size={24} color="#8B5CF6" />,
    },
  ];

  const mentalHealthTips = [
    {
      title: "Mantén rutinas saludables",
      description: "Establece horarios regulares para dormir, comer y hacer ejercicio",
      icon: <Feather name="clock" size={24} color="#10B981" />,
    },
    {
      title: "Practica la relajación",
      description: "Técnicas como respiración profunda, meditación o yoga",
      icon: <MaterialIcons name="self-improvement" size={24} color="#10B981" />,
    },
    {
      title: "Mantén conexiones sociales",
      description: "Habla con amigos, familia o personas de confianza",
      icon: <Feather name="users" size={24} color="#10B981" />,
    },
    {
      title: "Busca actividades placenteras",
      description: "Dedica tiempo a hobbies y actividades que disfrutes",
      icon: <Feather name="heart" size={24} color="#10B981" />,
    },
    {
      title: "Limita el estrés",
      description: "Identifica y maneja las fuentes de estrés en tu vida",
      icon: <MaterialIcons name="spa" size={24} color="#10B981" />,
    },
    {
      title: "Pide ayuda profesional",
      description: "No dudes en consultar con un psicólogo o psiquiatra",
      icon: <FontAwesome5 name="user-md" size={24} color="#10B981" />,
    },
  ];

  const warningSignals = [
    "Cambios drásticos en el estado de ánimo",
    "Pérdida de interés en actividades que antes disfrutabas",
    "Problemas para dormir o dormir demasiado",
    "Cambios significativos en el apetito",
    "Dificultad para concentrarse",
    "Sentimientos de desesperanza o inutilidad",
    "Pensamientos de autolesión o suicidio",
    "Aislamiento social",
    "Uso excesivo de alcohol o drogas",
    "Problemas en el rendimiento escolar o laboral",
  ];

  const mythsFacts = [
    {
      myth: "Los problemas de salud mental son una debilidad",
      fact: "Son condiciones médicas reales que pueden afectar a cualquiera",
    },
    {
      myth: "Solo los adultos tienen problemas de salud mental",
      fact: "Los jóvenes también pueden experimentar estos problemas",
    },
    {
      myth: "Hablar de problemas mentales los empeora",
      fact: "Hablar con profesionales y personas de confianza ayuda",
    },
    {
      myth: "Las personas con problemas mentales son peligrosas",
      fact: "La mayoría no representa ningún peligro para otros",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <LinearGradient colors={["#8B5CF6", "#7C3AED"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Salud Mental</Text>
            <Text style={styles.headerSubtitle}>
              Bienestar emocional y psicológico
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <View style={styles.introCard}>
            <FontAwesome5 name="brain" size={48} color="#8B5CF6" />
            <Text style={styles.introTitle}>Tu Bienestar Mental Importa</Text>
            <Text style={styles.introText}>
              La salud mental es tan importante como la salud física. Cuidar
              tu bienestar emocional te ayuda a enfrentar mejor los desafíos
              de la vida y desarrollar todo tu potencial.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <View style={styles.faqHeader}>
                <View style={styles.faqIconContainer}>{item.icon}</View>
                <Text style={styles.faqQuestion}>{item.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consejos para el Bienestar</Text>
          <View style={styles.tipsGrid}>
            {mentalHealthTips.map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <View style={styles.tipIconContainer}>{tip.icon}</View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Señales de Alerta</Text>
          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <Feather name="alert-triangle" size={24} color="#F59E0B" />
              <Text style={styles.warningTitle}>
                Cuándo buscar ayuda profesional
              </Text>
            </View>
            <Text style={styles.warningSubtitle}>
              Si experimentas varios de estos síntomas por más de dos semanas:
            </Text>
            {warningSignals.map((signal, index) => (
              <View key={index} style={styles.warningItem}>
                <View style={styles.warningDot} />
                <Text style={styles.warningText}>{signal}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mitos vs Realidad</Text>
          {mythsFacts.map((item, index) => (
            <View key={index} style={styles.mythCard}>
              <View style={styles.mythSection}>
                <View style={styles.mythHeader}>
                  <AntDesign name="closecircleo" size={16} color="#EF4444" />
                  <Text style={styles.mythLabel}>Mito</Text>
                </View>
                <Text style={styles.mythText}>{item.myth}</Text>
              </View>
              <View style={styles.factSection}>
                <View style={styles.factHeader}>
                  <AntDesign name="checkcircleo" size={16} color="#10B981" />
                  <Text style={styles.factLabel}>Realidad</Text>
                </View>
                <Text style={styles.factText}>{item.fact}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.emergencySection}>
          <View style={styles.emergencyCard}>
            <MaterialIcons name="emergency" size={32} color="#EF4444" />
            <Text style={styles.emergencyTitle}>Crisis de Salud Mental</Text>
            <Text style={styles.emergencyText}>
              Si tienes pensamientos de autolesión o suicidio, o si alguien
              que conoces está en crisis, busca ayuda inmediatamente.
            </Text>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => router.push("/(tabs)/resources")}
            >
              <Feather name="phone" size={18} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>Líneas de Crisis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
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
  introTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 16,
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
  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  faqIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    marginLeft: 36,
  },
  tipsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIconContainer: {
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  warningCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 12,
  },
  warningSubtitle: {
    fontSize: 14,
    color: "#78350F",
    marginBottom: 16,
    fontStyle: "italic",
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  warningDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F59E0B",
    marginTop: 8,
    marginRight: 12,
  },
  warningText: {
    fontSize: 14,
    color: "#78350F",
    flex: 1,
    lineHeight: 20,
  },
  mythCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  mythSection: {
    marginBottom: 16,
  },
  mythHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  mythLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
  mythText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  factSection: {},
  factHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  factLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
    marginLeft: 8,
  },
  factText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  emergencySection: {
    marginBottom: 20,
  },
  emergencyCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#991B1B",
    marginTop: 12,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 16,
    color: "#7F1D1D",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});