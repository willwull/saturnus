import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const GoldWrapper = styled.span`
  margin-top: 15px;
  text-align: center;
  color: #ccac00;
  font-weight: bold;
`;

const Circle = styled(Icon)`
  color: gold;
`;

const Star = styled(Icon)`
  color: ${props => props.theme.contentBg};
`;

type Props = {
  count: number;
};

function GoldCounter({ count }: Props) {
  return (
    <GoldWrapper className="gold-icon">
      <span className="fa-layers fa-fw">
        <Circle icon="circle" fixedWidth />
        <Star icon="star" transform="shrink-6" fixedWidth />
      </span>
      {count}
    </GoldWrapper>
  );
}

export default GoldCounter;
