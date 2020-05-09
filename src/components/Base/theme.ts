import { useContext } from "react";
import { ThemeContext } from "styled-components";

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
