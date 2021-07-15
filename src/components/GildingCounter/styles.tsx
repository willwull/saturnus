import styled from "styled-components";
import { darken } from "polished";

type Props = {
  type: "gold" | "platinum" | "silver";
};

function mapTypeToIconColor({ type }: Props) {
  const colors = {
    gold: "gold",
    platinum: "#25d8c3",
    silver: "#dddddd",
  };

  return colors[type];
}

function mapTypeToTextColor({ type }: Props) {
  const bgColor = mapTypeToIconColor({ type });
  return darken(0.1, bgColor);
}

export const GildingWrapper = styled.span`
  text-align: center;
  color: ${mapTypeToTextColor};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
