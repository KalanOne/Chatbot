import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import React, {useState} from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Resource {
  title: string;
  description: string;
  url?: string;
  phone?: string;
  icon: React.ReactNode;
  category: string;
}

export default function ResourcesScreen() {
  const resources: Resource[] = [
    {
      title: "National Suicide Prevention Lifeline",
      description: "24/7 free and confidential support for people in distress",
      phone: "988",
      icon: <Feather name="phone" size={24} color="#EF4444" />,
      category: "Apoyo en situaciones de crisis",
    },
    {
      title: "Crisis Text Line",
      description: "Text HOME to 741741 to reach a crisis counselor",
      phone: "741741",
      icon: <Feather name="message-square" size={24} color="#10B981" />,
      category: "Apoyo en situaciones de crisis",
    },
    {
      title: "StopBullying.gov",
      description: "Information and resources about bullying prevention",
      url: "https://www.stopbullying.gov",
      icon: <Feather name="globe" size={24} color="#3B82F6" />,
      category: "Bullying",
    },
    {
      title: "National Sexual Assault Hotline",
      description: "24/7 confidential support for survivors",
      phone: "1-800-656-4673",
      icon: <Feather name="phone" size={24} color="#8B5CF6" />,
      category: "Salud sexual",
    },
    {
      title: "Planned Parenthood",
      description: "Sexual health information and services",
      url: "https://www.plannedparenthood.org",
      icon: <Feather name="globe" size={24} color="#EC4899" />,
      category: "Salud sexual",
    },
    {
      title: "Teen Line",
      description: "Teens helping teens through difficult times",
      phone: "1-800-852-8336",
      icon: <Feather name="phone" size={24} color="#F59E0B" />,
      category: "Apoyo de compañeros",
    },
  ];

  const categories = [
    "Todos",
    "Apoyo en situaciones de crisis",
    "Bullying",
    "Salud sexual",
    "Apoyo de compañeros",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredResources =
    selectedCategory === "Todos"
      ? resources
      : resources.filter((resource) => resource.category === selectedCategory);

  const handleResourcePress = async (resource: Resource) => {
    try {
      if (resource.phone) {
        const url = `tel:${resource.phone}`;
        // const supported = await Linking.canOpenURL(url);
        // if (supported) {
          await Linking.openURL(url);
        // }
      } else if (resource.url) {
        // const supported = await Linking.canOpenURL(resource.url);
        // if (supported) {
          await Linking.openURL(resource.url);
        // }
      }
    } catch (error) {
      console.error("Error opening resource:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
      {/* <LinearGradient colors={["#53ab32", "#a6cd38"]} style={styles.header}> */}
      <LinearGradient colors={["#53ab32", "9bbf36"]} style={styles.header}>
        <Text style={styles.headerTitle}>Recursos de ayuda</Text>
        <Text style={styles.headerSubtitle}>
          Apoyo profesional cuando más lo necesitas
        </Text>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.resourcesContainer}
        contentContainerStyle={styles.resourcesContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredResources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resourceCard}
            onPress={() => handleResourcePress(resource)}
            activeOpacity={0.7}
          >
            <View style={styles.resourceIcon}>{resource.icon}</View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>
                {resource.description}
              </Text>
              <Text style={styles.resourceCategory}>{resource.category}</Text>
            </View>
            <Feather name="external-link" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>En Caso de Emergencia</Text>
          <Text style={styles.emergencyText}>
            Si está en peligro inmediato o tiene pensamientos suicidas, llame al 911 o acuda a la sala de emergencias más cercana.
          </Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => Linking.openURL("tel:911")}
          >
            <Feather name="phone" size={18} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>Llama 911</Text>
          </TouchableOpacity>
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
    paddingTop: Platform.OS=="android"? S(StatusBar.currentHeight ?? 30) + 10 : 50,
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
  categoriesContainer: {
    marginVertical: 20,
    maxHeight: 40,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryButtonActive: {
    backgroundColor: "#53ab32",
    borderColor: "#53ab32",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  resourcesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resourcesContent: {
    paddingBottom: 20,
  },
  resourceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
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
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 4,
  },
  resourceCategory: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  emergencyCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#991B1B",
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: "#7F1D1D",
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
