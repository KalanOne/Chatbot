import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
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

export default function SupportScreen() {
  const supportTips = [
    {
      title: "No Estas Solo/a",
      description:
        "Sea cual sea tu situación, hay personas que se preocupan y quieren ayudarte.",
      icon: <Feather name="users" size={24} color="#10B981" />,
    },
    {
      title: "Está Bien Pedir Ayuda",
      description: "Buscar apoyo es un signo de fortaleza, no de debilidad.",
      icon: <AntDesign name="hearto" size={24} color="#EC4899" />,
    },
    {
      title: "Tus Sentimientos Son Válidos",
      description:
        "Lo que sea que estés sintiendo ahora mismo es completamente comprensible.",
      icon: <AntDesign name="checkcircle" size={24} color="#3B82F6" />,
    },
    {
      title: "Tómalo Un Día A La Vez",
      description:
        "No tienes que resolverlo todo hoy. Los pequeños pasos cuentan.",
      icon: <AntDesign name="staro" size={24} color="#F59E0B" />,
    },
  ];

  const safetyReminders = [
    "Su privacidad es importante para nosotros",
    "Este chat no está supervisado por padres ni escuelas.",
    "No almacenamos tu información personal",
    "Puedes hablar de cualquier cosa que te preocupe.",
    "Si está en peligro inmediato, llame al 911.",
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <LinearGradient colors={["#FF37A1", "#FF67B8"]} style={styles.header}>
        <Text style={styles.headerTitle}>Apoyo y seguridad</Text>
        <Text style={styles.headerSubtitle}>
          Tú importas y tu bienestar es importante
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>
            Recuerda esto
          </Text>
          {supportTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={styles.tipIcon}>{tip.icon}</View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.safetyHeader}>
            <Feather name="shield" size={24} color="#FF37A1" />
            <Text style={styles.sectionTitle}>Tu seguridad y privacidad</Text>
          </View>
          <View style={styles.safetyCard}>
            {safetyReminders.map((reminder, index) => (
              <View key={index} style={styles.safetyItem}>
                <AntDesign name="checkcircleo" size={16} color="#10B981" />
                <Text style={styles.safetyText}>{reminder}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>
            Cómo funciona esto
          </Text>
          <View style={styles.howItWorksCard}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Iniciar una conversación</Text>
                <Text style={styles.stepDescription}>
                  Escribe o usa mensajes de voz para compartir lo que piensas.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Obtener apoyo</Text>
                <Text style={styles.stepDescription}>
                  Reciba respuestas comprensivas y recursos útiles
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Encuentra ayuda</Text>
                <Text style={styles.stepDescription}>
                  Acceda a recursos profesionales cuando los necesite
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => {
            router.navigate("/(tabs)");
          }}
        >
          <Feather name="message-circle" size={20} color="#FFFFFF" />
          <Text style={styles.helpButtonText}>Empezar a chatear</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  safetyHeader: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
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
  safetyCard: {
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
  safetyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  safetyText: {
    fontSize: 14,
    color: "#475569",
    marginLeft: 12,
    flex: 1,
  },
  howItWorksCard: {
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
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF37A1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: "#FF37A1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  helpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
