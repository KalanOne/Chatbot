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

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function BullyingScreen() {
  const faqData: FAQItem[] = [
    {
      question: "¿Qué es el bullying?",
      answer:
        "Es la agresión repetida y desequilibrada entre compañeros de escuela, donde uno o más estudiantes intencionalmente hostigan y/o agreden a otro(s) de forma constante. Esta violencia puede manifestarse de forma física, verbal, social o cibernética, causando un daño psicológico y/o físico en la víctima.",
      icon: <MaterialIcons name="help-outline" size={24} color="#F59E0B" />,
    },
    {
      question: "¿Cómo identificar el bullying?",
      answer:
        "Observa si hay cambios en el comportamiento, miedo a asistir a la escuela, baja autoestima o lesiones inexplicables. También señales como el aislamiento, tristeza constante o pérdida de objetos personales.",
      icon: <Feather name="eye" size={24} color="#F59E0B" />,
    },
    {
      question: "¿Cómo denuncio?",
      answer:
        "Habla con un maestro, orientador o director. También puedes usar líneas de apoyo o plataformas de denuncia anónima en tu escuela.",
      icon: <MaterialIcons name="report" size={24} color="#F59E0B" />,
    },
    {
      question: "¿Qué hago si sufro bullying?",
      answer:
        "No te calles. Habla con un adulto de confianza, documenta lo que ocurre, busca apoyo emocional y evita enfrentamientos físicos. Recuerda que no estás solo/a.",
      icon: <AntDesign name="Safety" size={24} color="#F59E0B" />,
    },
  ];

  const bullyingTypes = [
    {
      type: "Físico",
      description: "Golpes, empujones, patadas, daño a pertenencias",
      icon: <MaterialIcons name="pan-tool" size={24} color="#EF4444" />,
    },
    {
      type: "Verbal",
      description: "Insultos, burlas, amenazas, comentarios hirientes",
      icon: <MaterialIcons name="record-voice-over" size={24} color="#F59E0B" />,
    },
    {
      type: "Social",
      description: "Exclusión, rumores, humillación pública",
      icon: <MaterialIcons name="group-remove" size={24} color="#8B5CF6" />,
    },
    {
      type: "Cibernético",
      description: "Acoso a través de redes sociales, mensajes, internet",
      icon: <MaterialIcons name="computer" size={24} color="#3B82F6" />,
    },
  ];

  const actionSteps = [
    "Mantén la calma y no respondas con violencia",
    "Documenta los incidentes (fechas, lugares, testigos)",
    "Habla con un adulto de confianza inmediatamente",
    "Reporta la situación a las autoridades escolares",
    "Busca apoyo emocional de familiares o profesionales",
    "No te aísles, mantén contacto con amigos verdaderos",
  ];

  const preventionTips = [
    "Fomenta un ambiente de respeto y tolerancia",
    "Denuncia situaciones de acoso que presencies",
    "Apoya a compañeros que puedan estar siendo víctimas",
    "Participa en programas de prevención escolar",
    "Desarrolla habilidades de comunicación asertiva",
    "Busca ayuda de adultos cuando sea necesario",
  ];

  return (
    <View style={styles.container}>
     <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
      
      <LinearGradient colors={["#F59E0B", "#D97706"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Bullying</Text>
            <Text style={styles.headerSubtitle}>
              Prevención y acción
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
            <Feather name="shield" size={48} color="#F59E0B" />
            <Text style={styles.introTitle}>Detener el Bullying</Text>
            <Text style={styles.introText}>
              El bullying es un problema serio que afecta a muchos estudiantes.
              Conocer cómo identificarlo, prevenirlo y actuar es fundamental
              para crear entornos seguros para todos.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos de Bullying</Text>
          <View style={styles.typesGrid}>
            {bullyingTypes.map((item, index) => (
              <View key={index} style={styles.typeCard}>
                <View style={styles.typeIconContainer}>{item.icon}</View>
                <Text style={styles.typeTitle}>{item.type}</Text>
                <Text style={styles.typeDescription}>{item.description}</Text>
              </View>
            ))}
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
          <Text style={styles.sectionTitle}>¿Qué Hacer si Sufres Bullying?</Text>
          <View style={styles.actionCard}>
            {actionSteps.map((step, index) => (
              <View key={index} style={styles.actionItem}>
                <View style={styles.actionNumber}>
                  <Text style={styles.actionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.actionText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prevención</Text>
          <View style={styles.preventionCard}>
            <View style={styles.preventionHeader}>
              <Feather name="users" size={24} color="#10B981" />
              <Text style={styles.preventionTitle}>
                Todos podemos ayudar
              </Text>
            </View>
            {preventionTips.map((tip, index) => (
              <View key={index} style={styles.preventionItem}>
                <AntDesign name="checkcircleo" size={16} color="#10B981" />
                <Text style={styles.preventionText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.emergencySection}>
          <View style={styles.emergencyCard}>
            <MaterialIcons name="emergency" size={32} color="#EF4444" />
            <Text style={styles.emergencyTitle}>Situación de Emergencia</Text>
            <Text style={styles.emergencyText}>
              Si estás en peligro inmediato o presencias violencia física,
              busca ayuda de un adulto inmediatamente o llama a emergencias.
            </Text>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => router.push("/(tabs)/resources")}
            >
              <Feather name="phone" size={18} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>Buscar Ayuda</Text>
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
  typesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  typeCard: {
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
  typeIconContainer: {
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  typeDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16,
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
  actionCard: {
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
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  actionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  actionText: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
    lineHeight: 20,
  },
  preventionCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  preventionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  preventionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#166534",
    marginLeft: 12,
  },
  preventionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  preventionText: {
    fontSize: 14,
    color: "#15803D",
    marginLeft: 12,
    flex: 1,
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