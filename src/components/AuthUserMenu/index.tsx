import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Icon from "../Icon";
import { Wrapper } from "./styles";
import { RedditUser } from "snoowrap";

interface Props {
  userData: RedditUser;
  signOut: (event: React.MouseEvent<HTMLLIElement>) => void;
}

class AuthUserMenu extends Component<Props, {}> {
  render() {
    const { userData, signOut } = this.props;
    const karma = userData.link_karma + userData.comment_karma;

    const overlay = (
      <Menu>
        <Menu.Link to={`/user/${userData.name}`}>
          <Icon icon="far user-circle" /> {userData.name}
        </Menu.Link>
        <Menu.Item>
          <Icon icon="far star" /> {karma} karma
        </Menu.Item>
        <Menu.Link to={`/user/${userData.name}/saved`}>
          <Icon icon="far bookmark" /> Saved content
        </Menu.Link>
        <Menu.Divider />
        <ThemeTogglerMenuItem />
        <Menu.A href="https://www.reddit.com/settings">
          <Icon icon="far cog" /> Reddit preferences
        </Menu.A>
        <Menu.Divider />
        <Menu.Item onClick={signOut}>
          <Icon icon="far sign-out" /> Sign out
        </Menu.Item>
      </Menu>
    );

    return (
      <Wrapper>
        <Dropdown overlay={overlay} placement="bottomRight">
          <div className="user-menu">
            <img
              className="user-img"
              src={userData.icon_img}
              alt={userData.name}
            />
            <Icon icon="caret-down" />
          </div>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default AuthUserMenu;
