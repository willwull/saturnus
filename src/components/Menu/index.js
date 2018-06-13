import React from "react";
import PropTypes from "prop-types";
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
  padding: 15px;
  list-style: none;

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

Menu.Divider = styled.hr`
  margin: 5px 0;
  opacity: 0.2;
`;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
