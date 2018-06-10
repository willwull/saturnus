import React, { Component } from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import Dropdown from "../Dropdown";
import Menu from "../Menu";
import "./UserMenu.scss";

class UserMenu extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { userData, signOut } = this.props;
    const karma = userData.link_karma + userData.comment_karma;

    const overlay = (
      <Menu>
        <Menu.Item>
          <FaIcon icon={["far", "star"]} fixedWidth /> {karma} karma
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <FaIcon icon={["far", "moon"]} fixedWidth /> Toggle dark mode
        </Menu.Item>
        <Menu.Item>
          <a href="https://www.reddit.com/settings">
            <FaIcon icon={["far", "cog"]} fixedWidth /> Reddit preferences
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={signOut}>
          <FaIcon icon={["far", "sign-out"]} fixedWidth /> Sign out
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={overlay} placement="bottomRight">
        <div className="user-menu">
          <img
            className="user-img"
            src={userData.icon_img}
            alt={userData.name}
          />
          <span className="username">{userData.name}</span>
          <FaIcon icon="caret-down" />
        </div>
      </Dropdown>
    );
  }
}

export default UserMenu;
