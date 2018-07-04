import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContentBox from "components/ContentBox";
import "./Menu.scss";

function Menu({ children }) {
  return (
    <ContentBox className="menu-component">
      <ul role="menu">{children}</ul>
    </ContentBox>
  );
}

Menu.Item = styled.li`
  display: block;
  padding: 15px;
  list-style: none;
  color: ${props => props.theme.text};

  &:hover,
  &:active {
    cursor: pointer;
    background: ${props => props.theme.primary};
    color: white;
  }

  .fa-fw {
    margin-right: 5px;
  }
`;

Menu.Link = Menu.Item.withComponent(Link);

Menu.Divider = styled.hr`
  margin: 5px 0;
  opacity: 0.2;
`;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
