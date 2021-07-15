import styled from "styled-components";
import { lighten, darken } from "polished";
import { Link } from "react-router-dom";
import { ThemeColors } from "../Base/theme";

type Props = {
  theme: ThemeColors;
  type?: "primary" | "destructive";
};

function getColor(props: Props) {
  switch (props.type) {
    case "destructive":
      return props.theme.destructive;
    case "primary":
    default:
      return props.theme.primary;
  }
}

const PrimaryButton = styled.button`
  background: ${(p: Props) => getColor(p)};
  color: white;
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;
  display: inline-flex;
  gap: 8px;
  align-items: center;

  &:hover {
    background: ${(p: Props) => lighten(0.1, getColor(p))};
  }

  &:active {
    background: ${(p: Props) => darken(0.1, getColor(p))};
  }

  &:disabled {
    background: ${(p: Props) => lighten(0.3, getColor(p))};
    cursor: default;
  }
`;

export const PrimaryLink = PrimaryButton.withComponent(Link);

export default PrimaryButton;
