import { IsColorLight } from "@/utils/color";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useMemo } from "react";
import {
  ColorValue,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export { NeoButton };

interface NeoButtonProps {
  children: ReactNode;
  colors: [ColorValue, ColorValue, ...ColorValue[]];
  width?: number;
  height?: number;
  colorText?: ColorValue;
  onPress?: (event: GestureResponderEvent) => void;
}

function NeoButton({
  children,
  colors,
  width = 200,
  height = 60,
  colorText,
  onPress,
}: NeoButtonProps) {
  const primaryColor = colors[0];
  const textColor = IsColorLight(primaryColor) ? "#333" : "#FFF";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        neoContainer: {
          alignItems: "center",
          justifyContent: "center",
          margin: 15,
        },
        button: {
          width: width,
          height: height,
          borderRadius: 20,
          overflow: "hidden",
        },
        gradient: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        neoShadow: {
          shadowColor: primaryColor.toString(),
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 8,
        },
        text: {
          color: colorText ?? textColor,
          fontWeight: "900",
          fontSize: 16,
        },
      }),
    [colors, primaryColor, textColor, width, height, colorText]
  );

  return (
    <View style={styles.neoContainer}>
      {/* Fondo de sombra coloreada (simula el efecto neumórfico) */}
      <LinearGradient
        colors={colors} // Gradiente de la sombra
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, styles.neoShadow]}
      >
        {/* Botón principal con gradiente */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.text}>{children}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
