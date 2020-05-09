import { useContext } from "react";
import { ThemeContext } from "styled-components";

export type ThemeColors = {
  primary: string;
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  destructive: string;
  mod: string;
  body: string;
  text: string;
  textDeemphasized: string;
  contentBg: string;
};

export type ThemeColor = keyof ThemeColors;

const commonColors = {
  primary: "#1e7cf7",
  destructive: "#e34242",
  mod: "#21af28",
};

export const lightTheme: ThemeColors = {
  ...commonColors,
  secondary: "rgb(239, 243, 245)",
  secondaryHover: "rgb(222, 226, 228)",
  secondaryActive: "rgb(208, 211, 212)",
  body: "rgb(239, 243, 245)",
  text: "rgb(70, 70, 70)",
  textDeemphasized: "#A3A3A3",
  contentBg: "white",
};

export const darkTheme: ThemeColors = {
  ...commonColors,
  secondary: "rgb(61, 63, 68)",
  secondaryHover: "rgb(88, 90, 95)",
  secondaryActive: "rgb(52, 54, 60)",
  body: "rgb(20, 20, 20)",
  text: "white",
  textDeemphasized: "#919295",
  contentBg: "#23252b",
};

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}

export function useThemeColor(colorName: ThemeColor) {
  const theme = useTheme();
  return theme[colorName];
}
