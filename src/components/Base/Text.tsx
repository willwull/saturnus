import React from "react";
import { TextProps } from "./types";
import { useThemeColor } from "./theme";
import styled from "styled-components";

type StyledProps = {
  color: string;
  bold: boolean;
};
const StyledText = styled.span`
  color: ${(p: StyledProps) => p.color};
  font-weight: ${(p: StyledProps) => (p.bold ? "bold" : "regular")};
`;

function Text({ color, bold, children }: TextProps) {
  const textColor = useThemeColor(color || "text");
  return (
    <StyledText color={textColor} bold={bold || false}>
      {children}
    </StyledText>
  );
}

export default Text;
