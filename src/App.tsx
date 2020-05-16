import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { ThemeState } from "./reducers/theme";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import AppSidebar from "./containers/AppSidebar";
import Frontpage from "./pages/Frontpage";
import NotfoundPage from "./pages/NotfoundPage";
import SubredditPage from "./pages/SubredditPage";
import PostPage from "./pages/PostPage";
import TestingGrounds from "./pages/TestingGrounds";
import Loading from "./components/Loading";
import Searchpage from "./pages/Searchpage";
import SubredditSearch from "./pages/SubredditSearch";
import SavedPosts from "./pages/SavedPosts";
import Popovers from "./components/Popovers";
import UserPage from "./pages/UserPage";
import { ThemeColors } from "./components/Base/theme";

type GlobalStyleProps = {
  theme: ThemeColors;
};

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  html, body {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }

  blockquote {
    background: ${(props) => props.theme.body};
  }

  .mod {
    color: ${(props) => props.theme.mod};
  }

  .op {
    color: ${(props) => props.theme.primary};
  }
`;

type Props = {
  theme: ThemeState;
  isLoading: boolean;
};

class App extends Component<Props, {}> {
  render() {
    const { theme, isLoading } = this.props;

    if (isLoading) {
      return (
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyles />
            <Loading type="fullscreen" />
          </Fragment>
        </ThemeProvider>
      );
    }

    const subSortOptions = "hot|top|new|controversial|rising";
    const frontSortOptions = `${subSortOptions}|best`;
    const themeClassName = theme.isDark ? "theme-dark" : "theme-light";

    return (
      <ThemeProvider theme={theme.colors}>
        <div className={themeClassName}>
          <GlobalStyles />
          <Header />
          <AppSidebar />
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path={`/:sortMode(${frontSortOptions})?`}
                component={Frontpage}
              />
              <Route
                exact
                path={`/r/:subreddit/:sortMode(${subSortOptions})?`}
                component={SubredditPage}
              />
              <Route
                path="/r/:subreddit/comments/:postId"
                component={PostPage}
              />
              <Route path="/r/:subreddit/search" component={SubredditSearch} />
              <Route path="/user/:username/saved" component={SavedPosts} />
              <Route
                path="/user/:username/:contentType(overview|posts|comments)?"
                component={UserPage}
              />
              <Route path="/search" component={Searchpage} />
              <Route path="/testinggrounds" component={TestingGrounds} />
              <Route component={NotfoundPage} />
            </Switch>
          </ScrollToTop>
          <Popovers />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
