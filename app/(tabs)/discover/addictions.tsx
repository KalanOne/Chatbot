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

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function AddictionsScreen() {
  const faqData: FAQItem[] = [
    {
      question: "¿Qué son las adicciones?",
      answer:
        "Es una enfermedad física y psicoemocional que crea una dependencia o necesidad hacia una sustancia, actividad o relación. Se caracteriza por un conjunto de signos y síntomas en los que se involucran factores biológicos, genéticos, psicológicos y sociales.",
      icon: <MaterialIcons name="help-outline" size={24} color="#EF4444" />,
    },
    {
      question: "¿Cómo sé si tengo una adicción?",
      answer:
        "Si sientes una necesidad constante, pierdes el control al consumir o realizar algo, y afecta negativamente tu vida diaria, podrías estar frente a una adicción.",
      icon: <Feather name="search" size={24} color="#EF4444" />,
    },
    {
      question: "¿Cómo prevenir una adicción?",
      answer:
        "Infórmate, rodéate de entornos saludables, mantén comunicación con personas de confianza y evita situaciones de riesgo.",
      icon: <Feather name="shield" size={24} color="#EF4444" />,
    },
    {
      question: "¿Cómo dejar una adicción?",
      answer:
        "Busca ayuda profesional, acude a terapia, apóyate en tu red de apoyo y recuerda que pedir ayuda es un acto de valentía.",
      icon: <MaterialIcons name="healing" size={24} color="#EF4444" />,
    },
  ];

  const warningSignals = [
    "Necesidad constante de consumir",
    "Pérdida de control",
    "Tolerancia (necesitar más cantidad)",
    "Síndrome de abstinencia",
    "Abandono de actividades importantes",
    "Problemas en relaciones personales",
    "Deterioro del rendimiento académico/laboral",
    "Cambios en el estado de ánimo",
  ];

  const preventionTips = [
    "Mantén una comunicación abierta con familia y amigos",
    "Desarrolla habilidades para manejar el estrés",
    "Participa en actividades saludables y deportes",
    "Evita entornos de riesgo",
    "Busca ayuda profesional si sientes que necesitas apoyo",
    "Edúcate sobre los riesgos de las sustancias",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EF4444" />
      
      <LinearGradient colors={["#EF4444", "#DC2626"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Adicciones</Text>
            <Text style={styles.headerSubtitle}>
              Información y prevención
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
            <MaterialIcons name="healing" size={48} color="#EF4444" />
            <Text style={styles.introTitle}>Entendiendo las Adicciones</Text>
            <Text style={styles.introText}>
              Las adicciones son condiciones médicas tratables que afectan el
              cerebro y el comportamiento. Es importante recordar que buscar
              ayuda es un signo de fortaleza, no de debilidad.
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
          <Text style={styles.sectionTitle}>Señales de Alerta</Text>
          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <Feather name="alert-triangle" size={24} color="#F59E0B" />
              <Text style={styles.warningTitle}>
                Reconoce estas señales
              </Text>
            </View>
            {warningSignals.map((signal, index) => (
              <View key={index} style={styles.warningItem}>
                <View style={styles.warningDot} />
                <Text style={styles.warningText}>{signal}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consejos de Prevención</Text>
          <View style={styles.preventionCard}>
            {preventionTips.map((tip, index) => (
              <View key={index} style={styles.preventionItem}>
                <View style={styles.preventionNumber}>
                  <Text style={styles.preventionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.preventionText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <MaterialIcons name="support-agent" size={32} color="#10B981" />
            <Text style={styles.helpTitle}>¿Necesitas Ayuda?</Text>
            <Text style={styles.helpText}>
              Si tú o alguien que conoces está luchando contra una adicción,
              recuerda que la ayuda está disponible. No estás solo en este
              proceso.
            </Text>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => router.push("/(tabs)/resources")}
            >
              <Feather name="phone" size={18} color="#FFFFFF" />
              <Text style={styles.helpButtonText}>Buscar Recursos</Text>
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
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 12,
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
  preventionCard: {
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
  preventionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  preventionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  preventionNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  preventionText: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
    lineHeight: 20,
  },
  helpSection: {
    marginBottom: 20,
  },
  helpCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#166534",
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 16,
    color: "#15803D",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  helpButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  helpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});