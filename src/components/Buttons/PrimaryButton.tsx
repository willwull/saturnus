import styled from "styled-components";
import { lighten, darken } from "polished";
import { Link } from "react-router-dom";

const PrimaryButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.primary)};
  }

  &:active {
    background: ${({ theme }) => darken(0.1, theme.primary)};
  }

  &:disabled {
    background: ${({ theme }) => lighten(0.3, theme.primary)};
    cursor: default;
  }
`;

export const PrimaryLink = PrimaryButton.withComponent(Link);

export default PrimaryButton;
