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
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function SexualHealthScreen() {
  const faqData: FAQItem[] = [
    {
      question: "¿Qué es la salud sexual?",
      answer:
        "Es el estado de bienestar físico, mental y social en relación con la sexualidad, que no se limita a la ausencia de enfermedades o disfunciones, sino que incluye la capacidad de disfrutar de una vida sexual satisfactoria y libre de riesgos, así como la libertad para tomar decisiones sobre la reproducción.",
      icon: <AntDesign name="heart" size={24} color="#EC4899" />,
    },
    {
      question: "¿Qué es un problema de salud sexual?",
      answer:
        "Un problema de salud sexual puede incluir infecciones de transmisión sexual (ITS), disfunciones sexuales, violencia sexual, entre otros.",
      icon: <MaterialIcons name="help-outline" size={24} color="#EC4899" />,
    },
    {
      question: "¿Cómo cuidar tu salud sexual?",
      answer:
        "Usa protección, infórmate, mantén una comunicación abierta con tu pareja y acude regularmente a chequeos médicos.",
      icon: <Feather name="shield" size={24} color="#EC4899" />,
    },
    {
      question: "Riesgos del embarazo adolescente",
      answer:
        "El embarazo en adolescentes puede afectar la salud física y emocional, interrumpir estudios y limitar oportunidades.",
      icon: <MaterialIcons name="warning" size={24} color="#EC4899" />,
    },
  ];

  const protectionMethods = [
    {
      method: "Preservativo masculino",
      effectiveness: "98% efectivo",
      description: "Protege contra ITS y embarazo",
      icon: <Feather name="shield" size={24} color="#10B981" />,
    },
    {
      method: "Preservativo femenino",
      effectiveness: "95% efectivo",
      description: "Alternativa controlada por la mujer",
      icon: <Feather name="shield" size={24} color="#10B981" />,
    },
    {
      method: "Anticonceptivos hormonales",
      effectiveness: "99% efectivo",
      description: "Previene embarazo, no ITS",
      icon: <MaterialIcons name="medication" size={24} color="#F59E0B" />,
    },
    {
      method: "DIU",
      effectiveness: "99% efectivo",
      description: "Protección a largo plazo",
      icon: <MaterialIcons name="medical-services" size={24} color="#F59E0B" />,
    },
  ];

  const its_info = [
    {
      name: "VIH/SIDA",
      symptoms: "Puede no presentar síntomas inicialmente",
      prevention: "Uso de preservativo, no compartir agujas",
    },
    {
      name: "Gonorrea",
      symptoms: "Dolor al orinar, secreciones",
      prevention: "Uso de preservativo, pruebas regulares",
    },
    {
      name: "Clamidia",
      symptoms: "A menudo asintomática",
      prevention: "Uso de preservativo, detección temprana",
    },
    {
      name: "Sífilis",
      symptoms: "Úlceras, erupciones cutáneas",
      prevention: "Uso de preservativo, tratamiento oportuno",
    },
  ];

  const healthyRelationshipTips = [
    "Comunicación abierta y honesta",
    "Respeto mutuo y consentimiento",
    "Establecimiento de límites claros",
    "Apoyo emocional recíproco",
    "Resolución pacífica de conflictos",
    "Respeto por la autonomía del otro",
  ];

  const teenPregnancyRisks = [
    "Mayor riesgo de complicaciones durante el embarazo",
    "Interrupción de la educación",
    "Limitación de oportunidades laborales",
    "Impacto en el desarrollo emocional",
    "Dificultades económicas",
    "Aislamiento social",
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
      
      <LinearGradient colors={["#EC4899", "#DB2777"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Salud Sexual</Text>
            <Text style={styles.headerSubtitle}>
              Información y cuidado responsable
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
            <AntDesign name="heart" size={48} color="#EC4899" />
            <Text style={styles.introTitle}>Tu Salud Sexual Importa</Text>
            <Text style={styles.introText}>
              La salud sexual es parte integral de tu bienestar general.
              Informarte y tomar decisiones responsables te ayuda a cuidar
              tu cuerpo y tu futuro.
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
          <Text style={styles.sectionTitle}>Métodos de Protección</Text>
          <View style={styles.methodsGrid}>
            {protectionMethods.map((method, index) => (
              <View key={index} style={styles.methodCard}>
                <View style={styles.methodIconContainer}>{method.icon}</View>
                <Text style={styles.methodName}>{method.method}</Text>
                <Text style={styles.methodEffectiveness}>{method.effectiveness}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Infecciones de Transmisión Sexual</Text>
          <View style={styles.itsCard}>
            <View style={styles.itsHeader}>
              <MaterialIcons name="info" size={24} color="#F59E0B" />
              <Text style={styles.itsTitle}>Información importante</Text>
            </View>
            {its_info.map((its, index) => (
              <View key={index} style={styles.itsItem}>
                <Text style={styles.itsName}>{its.name}</Text>
                <Text style={styles.itsSymptoms}>Síntomas: {its.symptoms}</Text>
                <Text style={styles.itsPrevention}>Prevención: {its.prevention}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Relaciones Saludables</Text>
          <View style={styles.relationshipCard}>
            <View style={styles.relationshipHeader}>
              <FontAwesome5 name="heart" size={24} color="#10B981" />
              <Text style={styles.relationshipTitle}>
                Características de una relación sana
              </Text>
            </View>
            {healthyRelationshipTips.map((tip, index) => (
              <View key={index} style={styles.relationshipItem}>
                <AntDesign name="checkcircleo" size={16} color="#10B981" />
                <Text style={styles.relationshipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Embarazo Adolescente</Text>
          <View style={styles.pregnancyCard}>
            <View style={styles.pregnancyHeader}>
              <MaterialIcons name="warning" size={24} color="#F59E0B" />
              <Text style={styles.pregnancyTitle}>Riesgos y consideraciones</Text>
            </View>
            <Text style={styles.pregnancySubtitle}>
              El embarazo en la adolescencia puede tener múltiples consecuencias:
            </Text>
            {teenPregnancyRisks.map((risk, index) => (
              <View key={index} style={styles.pregnancyItem}>
                <View style={styles.pregnancyDot} />
                <Text style={styles.pregnancyText}>{risk}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <MaterialIcons name="local-hospital" size={32} color="#3B82F6" />
            <Text style={styles.helpTitle}>Busca Atención Médica</Text>
            <Text style={styles.helpText}>
              Si tienes dudas sobre tu salud sexual, síntomas preocupantes
              o necesitas orientación, no dudes en consultar con un profesional
              de la salud.
            </Text>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => router.push("/(tabs)/resources")}
            >
              <Feather name="phone" size={18} color="#FFFFFF" />
              <Text style={styles.helpButtonText}>Encontrar Recursos</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  methodsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  methodCard: {
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
  methodIconContainer: {
    marginBottom: 12,
  },
  methodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  methodEffectiveness: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 6,
  },
  methodDescription: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  itsCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  itsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 12,
  },
  itsItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FED7AA",
  },
  itsName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#78350F",
    marginBottom: 4,
  },
  itsSymptoms: {
    fontSize: 14,
    color: "#78350F",
    marginBottom: 2,
  },
  itsPrevention: {
    fontSize: 14,
    color: "#78350F",
  },
  relationshipCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  relationshipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  relationshipTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#166534",
    marginLeft: 12,
  },
  relationshipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  relationshipText: {
    fontSize: 14,
    color: "#15803D",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  pregnancyCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  pregnancyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pregnancyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 12,
  },
  pregnancySubtitle: {
    fontSize: 14,
    color: "#78350F",
    marginBottom: 16,
    fontStyle: "italic",
  },
  pregnancyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  pregnancyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F59E0B",
    marginTop: 8,
    marginRight: 12,
  },
  pregnancyText: {
    fontSize: 14,
    color: "#78350F",
    flex: 1,
    lineHeight: 20,
  },
  helpSection: {
    marginBottom: 20,
  },
  helpCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 16,
    color: "#1D4ED8",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  helpButton: {
    backgroundColor: "#3B82F6",
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