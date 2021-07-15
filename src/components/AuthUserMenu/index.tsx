import React, { Component } from "react";
import ThemeTogglerMenuItem from "../../containers/ThemeTogglerMenuItem";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import { Wrapper } from "./styles";
import { RedditUser } from "snoowrap";
import {
  ChevronDown,
  User,
  Star,
  Bookmark,
  Settings,
  LogOut,
} from "react-feather";

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
          <User size={20} /> {userData.name}
        </Menu.Link>
        <Menu.Item>
          <Star size={20} /> {karma} karma
        </Menu.Item>
        <Menu.Link to={`/user/${userData.name}/saved`}>
          <Bookmark size={20} /> Saved content
        </Menu.Link>
        <Menu.Divider />
        <ThemeTogglerMenuItem />
        <Menu.A href="https://www.reddit.com/settings">
          <Settings size={20} /> Reddit preferences
        </Menu.A>
        <Menu.Divider />
        <Menu.Item onClick={signOut}>
          <LogOut size={20} /> Sign out
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
            <ChevronDown size={20} />
          </div>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default AuthUserMenu;
