import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Icon from "../Icon";
import { GuestIconWrapper } from "./styles";
import { Wrapper } from "../AuthUserMenu/styles";

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
          <Icon icon="far sign-in" /> Sign in / Sign up
        </Menu.Item>
      </Menu>
    );

    return (
      <Wrapper>
        <Dropdown overlay={overlay} placement="bottomRight">
          <div className="user-menu">
            <GuestIconWrapper>
              <Icon icon="far user" />
            </GuestIconWrapper>
            <Icon icon="caret-down" />
          </div>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default GuestUserMenu;
