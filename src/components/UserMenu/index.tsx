import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Icon from "../Icon";
import { Username } from "./styles";

interface Props {
  userData: any;
  signOut: (event: React.MouseEvent<HTMLLIElement>) => void;
}

class UserMenu extends Component<Props, {}> {
  render() {
    const { userData, signOut } = this.props;
    const karma = userData.link_karma + userData.comment_karma;

    const overlay = (
      <Menu>
        <Menu.Item>
          <Icon icon="far star" fixedWidth /> {karma} karma
        </Menu.Item>
        <Menu.Divider />
        <ThemeTogglerMenuItem />
        <Menu.Item>
          <a href="https://www.reddit.com/settings">
            <Icon icon="far cog" fixedWidth /> Reddit preferences
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={signOut}>
          <Icon icon="far sign-out" fixedWidth /> Sign out
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
          <Username>{userData.name}</Username>
          <Icon icon="caret-down" />
        </div>
      </Dropdown>
    );
  }
}

export default UserMenu;
