import React from "react";
import { ThemeColor } from "./theme";

export type TextProps = {
  bold?: boolean;
  children?: React.ReactNode;
  color?: ThemeColor;
};

export type TextLinkProps = TextProps & {
  to?: string;
  externalUrl?: string;
};
