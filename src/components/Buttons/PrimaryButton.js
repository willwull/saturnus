import styled from "styled-components";
import { lighten, darken } from "polished";

const PrimaryButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.primaryColor)};
  }

  &:active {
    background: ${({ theme }) => darken(0.1, theme.primaryColor)};
  }

  &:disabled {
    background: ${({ theme }) => lighten(0.3, theme.primaryColor)};
    cursor: default;
  }
`;

export default PrimaryButton;
