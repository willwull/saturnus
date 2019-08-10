import React from "react";
import Icon from "../Icon";
import styled from "styled-components";

type Props = {
  isStarred: boolean;
  onClick: (isStarred: boolean) => void;
};

const Btn = styled.button`
  font-size: 0.75em;
  margin-left: 0.75ch;
  color: ${props => props.theme.primary};
`;

function StarSubBtn({ isStarred, onClick }: Props) {
  const iconName = isStarred ? "star" : "far star";

  return (
    <Btn onClick={() => onClick(isStarred)}>
      <Icon icon={iconName} />
    </Btn>
  );
}

export default StarSubBtn;
