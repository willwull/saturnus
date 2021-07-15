import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { lighten, darken } from "polished";
import { useTheme } from "./theme";
import { TextLinkProps } from "./types";
import { ExternalLink } from "react-feather";

type StyledProps = {
  color: string;
  bold: boolean;
};
const StyledLink = styled.a`
  color: ${(p: StyledProps) => p.color};
  font-weight: ${(p: StyledProps) => (p.bold ? "bold" : "regular")};
  word-break: break-word;

  &:hover {
    color: ${(p: StyledProps) => lighten(0.2, p.color)};
  }

  &:active {
    color: ${(p: StyledProps) => darken(0.1, p.color)};
  }
`;

const StyledAppLink = StyledLink.withComponent(Link);

/**
 * A base component for a text based link.
 */
function TextLink({ to, externalUrl, color, children, bold }: TextLinkProps) {
  const theme = useTheme();
  const colorName = color || "primary";
  const colorValue = theme[colorName];

  if (to) {
    return (
      <StyledAppLink to={to} color={colorValue} bold={bold || false}>
        {children}
      </StyledAppLink>
    );
  }

  if (externalUrl) {
    // Force external links to open in new tab
    return (
      <StyledLink
        href={externalUrl}
        color={colorValue}
        bold={bold || false}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}{" "}
        <ExternalLink size={16} style={{ verticalAlign: "text-top" }} />
      </StyledLink>
    );
  }

  throw new Error("One of the props 'to' or 'href' must be specified.");
}

export default TextLink;
