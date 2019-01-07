import { SET_DARK_THEME, SET_LIGHT_THEME } from "../actions/theme";
import { getStoredTheme } from "../LocalCache";

export type ThemeColors = {
  primary: string;
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
  mod: "#21af28",
};

const lightTheme: ThemeColors = {
  ...commonColors,
  body: "rgb(239, 243, 245)",
  text: "rgb(70, 70, 70)",
  contentBg: "white",
};

const darkTheme: ThemeColors = {
  ...commonColors,
  body: "#23252b",
  text: "white",
  contentBg: "#1d1e22",
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
