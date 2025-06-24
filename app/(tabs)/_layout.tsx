import { Tabs } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
export default function TabLayout() {
  const [activeColor, setActiveColor] = useState("F19433");
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          paddingTop: 8,
          minHeight: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="message-circle" size={size} color={color} />;
          },
          freezeOnBlur: true,
        }}
        listeners={{
          focus: () => {
            setActiveColor("#F19433");
          },
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: "Recursos",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="book-open" size={size} color={color} />;
          },
          freezeOnBlur: true,
        }}
        listeners={{
          focus: () => {
            setActiveColor("#53AB32");
          },
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Apoyo",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
          freezeOnBlur: true,
        }}
        listeners={{
          focus: () => {
            setActiveColor("#FF37A1");
          },
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ size, color }) => (
            <Feather name="compass" size={size} color={color} />
          ),
          freezeOnBlur: true,
        }}
        listeners={{
          focus: () => {
            setActiveColor("#456AE3");
          },
        }}
      />
    </Tabs>
  );
}
