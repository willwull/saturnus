import React from "react";
import { Switch, Route } from "react-router-dom";
import BackButton from "./BackButton";
import SidebarToggler from "../../containers/SidebarToggler";
import Icon from "../Icon";

function HeaderButton() {
  return (
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
  );
}

export default HeaderButton;
