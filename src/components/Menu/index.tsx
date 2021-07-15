import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContentBox from "../ContentBox";
import "./Menu.scss";

type Props = {
  children: React.ReactNode;
};

function Menu({ children }: Props) {
  return (
    <ContentBox className="menu-component">
      <ul role="menu">{children}</ul>
    </ContentBox>
  );
}

Menu.Item = styled.li`
  display: flex;
  gap: 12px;
  padding: 15px;
  list-style: none;
  color: ${(props) => props.theme.text};
  align-items: center;

  &:hover,
  &:active {
    cursor: pointer;
    background: ${(props) => props.theme.primary};
    color: white;
  }

  .fa-fw {
    margin-right: 5px;
  }
`;

Menu.Link = Menu.Item.withComponent(Link);

Menu.A = Menu.Item.withComponent("a");

Menu.Divider = styled.hr`
  margin: 5px 0;
  opacity: 0.2;
`;

export default Menu;
