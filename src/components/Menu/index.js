import React from "react";
import PropTypes from "prop-types";
import "./Menu.scss";

function Menu({ children }) {
  return <ul className="menu-component">{children}</ul>;
}

Menu.Item = ({ children }) => <li className="menu-item">{children}</li>;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

Menu.Item.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
