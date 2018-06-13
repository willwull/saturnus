import { SET_DARK_THEME, SET_LIGHT_THEME } from "actions/theme";

const lightTheme = {
  primary: "#1e7cf7",
  body: "rgb(239, 243, 245)",
  text: "rgb(70, 70, 70)",
  contentBg: "white",
};

const darkTheme = {
  primary: lightTheme.primary,
  body: "#23252b",
  text: "white",
  contentBg: "#1d1e22",
};

export default function theme(
  state = {
    isDark: true,
    colors: darkTheme,
  },
  action,
) {
  switch (action.type) {
    case SET_DARK_THEME:
      return { ...state, isDark: true, colors: darkTheme };
    case SET_LIGHT_THEME:
      return { ...state, isDark: false, colors: lightTheme };
    default:
      return state;
  }
}
