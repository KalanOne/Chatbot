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
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: [string, string];
  route: string;
}

export default function DiscoverScreen() {
  const topics: Topic[] = [
    {
      id: "addictions",
      title: "Adicciones",
      description: "Información sobre prevención y tratamiento de adicciones",
      icon: <MaterialIcons name="healing" size={32} color="#FFFFFF" />,
      color: "#EF4444",
      gradient: ["#EF4444", "#DC2626"],
      route: "/discover/addictions",
    },
    {
      id: "bullying",
      title: "Bullying",
      description: "Cómo identificar, prevenir y actuar ante el acoso escolar",
      icon: <Feather name="shield" size={32} color="#FFFFFF" />,
      color: "#F59E0B",
      gradient: ["#F59E0B", "#D97706"],
      route: "/discover/bullying",
    },
    {
      id: "mental-health",
      title: "Salud Mental",
      description: "Bienestar emocional y psicológico para una vida plena",
      icon: <FontAwesome5 name="brain" size={32} color="#FFFFFF" />,
      color: "#8B5CF6",
      gradient: ["#8B5CF6", "#7C3AED"],
      route: "/discover/mental-health",
    },
    {
      id: "sexual-health",
      title: "Salud Sexual",
      description: "Información sobre sexualidad responsable y saludable",
      icon: <AntDesign name="heart" size={32} color="#FFFFFF" />,
      color: "#EC4899",
      gradient: ["#EC4899", "#DB2777"],
      route: "/discover/sexual-health",
    },
  ];

  const handleTopicPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
      <LinearGradient colors={["#456AE3", "#45AAE3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Descubre</Text>
        <Text style={styles.headerSubtitle}>
          Información importante para tu bienestar
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>¡Hola!</Text>
          <Text style={styles.welcomeText}>
            Aquí encontrarás información valiosa sobre temas importantes para tu
            desarrollo y bienestar. Explora cada sección para aprender más.
          </Text>
        </View>

        <View style={styles.topicsGrid}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                index % 2 === 0 ? styles.leftCard : styles.rightCard,
              ]}
              onPress={() => handleTopicPress(topic.route)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={topic.gradient}
                style={styles.topicGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.topicIconContainer}>
                  {topic.icon}
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicDescription}>
                    {topic.description}
                  </Text>
                </View>
                <View style={styles.topicArrow}>
                  <Feather name="arrow-right" size={20} color="#FFFFFF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Feather name="info" size={24} color="#456AE3" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Información Confiable</Text>
              <Text style={styles.infoText}>
                Todo el contenido ha sido revisado por profesionales de la salud
                y educación para brindarte información precisa y actualizada.
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Feather name="lock" size={24} color="#10B981" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Privacidad Garantizada</Text>
              <Text style={styles.infoText}>
                Tu privacidad es importante. Puedes explorar toda la información
                de forma anónima y segura.
              </Text>
            </View>
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
    marginTop: Platform.OS=="android"? 0 : 0,
    // paddingTop: Platform.OS=="android"? (StatusBar.currentHeight ?? 40) + 10 : 50,
    paddingTop:  50,
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
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
  },
  topicsGrid: {
    marginBottom: 32,
  },
  topicCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  leftCard: {
    marginRight: 8,
  },
  rightCard: {
    marginLeft: 8,
  },
  topicGradient: {
    padding: 20,
    minHeight: 140,
    justifyContent: "space-between",
  },
  topicIconContainer: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  topicContent: {
    flex: 1,
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  topicDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 20,
  },
  topicArrow: {
    alignSelf: "flex-end",
  },
  infoSection: {
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});