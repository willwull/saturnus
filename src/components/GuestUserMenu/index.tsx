import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Icon from "../Icon";
import { Username } from "../AuthUserMenu/styles";
import { GuestIconWrapper } from "./styles";

interface Props {
  signIn: () => void;
}

class GuestUserMenu extends Component<Props, {}> {
  render() {
    const overlay = (
      <Menu>
        <ThemeTogglerMenuItem />
        <Menu.Divider />
        <Menu.Item onClick={this.props.signIn}>
          <Icon icon="far sign-in" fixedWidth /> Sign in / Sign up
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={overlay} placement="bottomRight">
        <div className="user-menu">
          <GuestIconWrapper>
            <Icon icon="far user" />
          </GuestIconWrapper>
          <Username>Guest</Username>
          <Icon icon="caret-down" />
        </div>
      </Dropdown>
    );
  }
}

export default GuestUserMenu;
