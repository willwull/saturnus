import { SET_DARK_THEME, SET_LIGHT_THEME } from "../actions/theme";
import { getStoredTheme } from "../LocalCache";

export type ThemeColors = {
  primary: string;
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  destructive: string;
  mod: string;
  body: string;
  text: string;
  contentBg: string;
};

export type ThemeState = {
  isDark: boolean;
  colors: ThemeColors;
};

const commonColors = {
  primary: "#1e7cf7",
  destructive: "#e34242",
  mod: "#21af28",
};

const lightTheme: ThemeColors = {
  ...commonColors,
  secondary: "rgb(239, 243, 245)",
  secondaryHover: "rgb(222, 226, 228)",
  secondaryActive: "rgb(208, 211, 212)",
  body: "rgb(239, 243, 245)",
  text: "rgb(70, 70, 70)",
  contentBg: "white",
};

const darkTheme: ThemeColors = {
  ...commonColors,
  secondary: "rgb(61, 63, 68)",
  secondaryHover: "rgb(88, 90, 95)",
  secondaryActive: "rgb(52, 54, 60)",
  body: "rgb(20, 20, 20)",
  text: "white",
  contentBg: "#23252b",
};

function getDefaultTheme(): ThemeState {
  const isDark = getStoredTheme() || false;
  return {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
  };
}

export default function theme(
  state = getDefaultTheme(),
  action: any,
): ThemeState {
  switch (action.type) {
    case SET_DARK_THEME:
      return { ...state, isDark: true, colors: darkTheme };
    case SET_LIGHT_THEME:
      return { ...state, isDark: false, colors: lightTheme };
    default:
      return state;
  }
}
