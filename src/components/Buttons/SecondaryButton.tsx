import styled from "styled-components";
import { transparentize } from "polished";
import { Link } from "react-router-dom";

const SecondaryButton = styled.button`
  background: ${p => p.theme.secondary};
  color: ${p => p.theme.text};
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.secondaryHover};
  }

  &:active {
    background: ${({ theme }) => theme.secondaryActive};
  }

  &:disabled {
    background: ${p => p.theme.secondary};
    color: ${({ theme }) => transparentize(0.6, theme.text)};
    cursor: default;
  }
`;

export const SecondaryLink = SecondaryButton.withComponent(Link);

export default SecondaryButton;
