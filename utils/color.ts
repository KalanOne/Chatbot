import { ColorValue } from "react-native";
export { IsColorLight };

function IsColorLight(color: ColorValue) {
  const hex = color.toString().replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.6; // Umbral ajustable
}
