import { SET_DARK_THEME, SET_LIGHT_THEME } from "../actions/theme";
import { getStoredTheme } from "../LocalCache";
import { ThemeColors, darkTheme, lightTheme } from "../components/Base/theme";

export type ThemeState = {
  isDark: boolean;
  colors: ThemeColors;
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
