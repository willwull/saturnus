import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const GildingWrapper = styled.span`
  margin-top: 15px;
  text-align: center;
  color: #ccac00;
  font-weight: bold;
`;

const Circle = styled(Icon)`
  color: gold;
`;

const GildingIcon = styled(Icon)`
  color: ${props => props.theme.contentBg};
`;

type Props = {
  count: number;
  type?: "gold" | "platinum" | "silver";
};

function GildingCounter({ count }: Props) {
  return (
    <GildingWrapper className="gold-icon">
      <span className="fa-layers fa-fw">
        <Circle icon="circle" fixedWidth />
        <GildingIcon icon="star" transform="shrink-6" fixedWidth />
      </span>
      {count}
    </GildingWrapper>
  );
}

GildingCounter.defaultProps = {
  type: "gold",
};

export default GildingCounter;
