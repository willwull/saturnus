import React, { createContext, useContext } from "react";
import { TextProps } from "./types";
import { useThemeColor } from "./theme";
import styled from "styled-components";

type StyledProps = {
  color: string;
  bold: boolean;
};
const StyledSpan = styled.span`
  color: ${(p: StyledProps) => p.color};
  font-weight: ${(p: StyledProps) => (p.bold ? "bold" : "regular")};
`;
const StyledDiv = styled.div`
  color: ${(p: StyledProps) => p.color};
  font-weight: ${(p: StyledProps) => (p.bold ? "bold" : "regular")};
`;

// A context to keep track of if a Text element is a descendant of
// another Text element or not, in which case we render a p instead of span.
const TextContext = createContext<boolean>(false);

function Text({ color, bold, children }: TextProps) {
  const textColor = useThemeColor(color || "text");
  const hasTextParent = useContext(TextContext);
  const Element = hasTextParent ? StyledSpan : StyledDiv;

  return (
    <Element color={textColor} bold={bold || false}>
      {children}
    </Element>
  );
}

export default Text;
