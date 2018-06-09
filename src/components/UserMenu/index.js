import React, { Component } from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import "./UserMenu.scss";

class UserMenu extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  state = {};

  render() {
    const { userData } = this.props;
    return (
      <button className="user-menu">
        <img className="user-img" src={userData.icon_img} alt={userData.name} />
        <span className="username">{userData.name}</span>
        <FaIcon icon="caret-down" />
      </button>
    );
  }
}

export default UserMenu;
