import { ColorValue } from "react-native";

export { IsColorLight, PRINCIPAL_COLORS };

function IsColorLight(color: ColorValue) {
  const hex = color.toString().replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.6; // Umbral ajustable
}

const PRINCIPAL_COLORS = [
  "#F19433",
  "#53AB32",
  "#FF37A1",
  "#456AE3",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#f7ad44",
  "#A6CD38",
  "#9bbf36",
  "#FF67B8",
  "#45AAE3",
  "#DC2626",
  "#D97706",
  "#7C3AED",
  "#DB2777",
];
