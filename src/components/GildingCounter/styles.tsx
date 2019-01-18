import styled from "styled-components";
import Icon from "../Icon";
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
  margin-top: 15px;
  text-align: center;
  color: ${mapTypeToTextColor};
  font-weight: bold;
`;

export const Circle = styled(Icon)`
  color: ${mapTypeToIconColor};
`;

export const GildingIcon = styled(Icon)`
  color: ${props => props.theme.contentBg};
`;
