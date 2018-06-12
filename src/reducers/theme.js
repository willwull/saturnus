import { SET_DARK_THEME, SET_LIGHT_THEME } from "actions/theme";

const lightTheme = {
  primary: "#1e7cf7",
  body: "rgb(239, 243, 245)",
  text: "rgb(70, 70, 70)",
  contentBg: "white",
};

const darkTheme = {
  primary: lightTheme.primary,
  body: "#2d3037",
  text: "white",
  contentBg: "#22252e",
};

export default function theme(state = darkTheme, action) {
  switch (action.type) {
    case SET_DARK_THEME:
      return darkTheme;
    case SET_LIGHT_THEME:
      return lightTheme;
    default:
      return state;
  }
}
