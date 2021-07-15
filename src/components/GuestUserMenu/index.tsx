import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import { Wrapper } from "../AuthUserMenu/styles";
import { ChevronDown, LogIn, User } from "react-feather";

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
          <LogIn size={20} /> Sign in / Sign up
        </Menu.Item>
      </Menu>
    );

    return (
      <Wrapper>
        <Dropdown overlay={overlay} placement="bottomRight">
          <div className="user-menu">
            <User />
            <ChevronDown size={20} />
          </div>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default GuestUserMenu;
