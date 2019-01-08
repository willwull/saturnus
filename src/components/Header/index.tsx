import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import LoggedInUserMenu from "../../containers/LoggedInUserMenu";
import SidebarToggler from "../../containers/SidebarToggler";
import ContentBox from "../ContentBox";
import Icon from "../Icon";
import SaturnusLogo from "../SaturnusLogo";
import { LogoWrapper } from "./styles";
import BackButton from "./BackButton";
import "./Header.scss";

function Header() {
  return (
    <ContentBox className="header-component">
      <Switch>
        <Route
          path="/r/:subreddit/comments/:postId/:postTitle"
          component={BackButton}
        />
        <Route
          render={() => (
            <SidebarToggler>
              <Icon icon="bars" />
            </SidebarToggler>
          )}
        />
      </Switch>
      <Link to="/">
        <LogoWrapper>
          <SaturnusLogo />
        </LogoWrapper>
      </Link>
      <div>
        <Link to="/">Saturnus</Link>
      </div>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

export default Header;
