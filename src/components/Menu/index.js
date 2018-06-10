import React from "react";
import PropTypes from "prop-types";
import "./Menu.scss";

function Menu({ children }) {
  return (
    <ul role="menu" className="menu-component">
      {children}
    </ul>
  );
}

Menu.Item = ({ children, ...rest }) => (
  <li {...rest} role="menuitem" className="menu-item">
    {children}
  </li>
);

Menu.Divider = () => <hr className="menu-divider" />;

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

Menu.Item.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
