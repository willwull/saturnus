import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { ThemeColors } from "./reducers/theme";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import AppSidebar from "./containers/AppSidebar";
import Frontpage from "./pages/Frontpage";
import NotfoundPage from "./pages/NotfoundPage";
import SubredditPage from "./pages/SubredditPage";
import PostPage from "./pages/PostPage";
import TestingGrounds from "./pages/TestingGrounds";
import ModalSwitch from "./components/ModalSwitch";
import PostModal from "./pages/PostModal";
import Loading from "./components/Loading";
import Searchpage from "./pages/Searchpage";
import SubredditSearch from "./pages/SubredditSearch";

type GlobalStyleProps = {
  theme: ThemeColors;
};

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  html, body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
  }

  blockquote {
    background: ${props => props.theme.body};
  }

  .mod {
    color: ${props => props.theme.mod};
  }

  .op {
    color: ${props => props.theme.primary};
  }
`;

type Props = {
  theme: {
    body: string;
  };
  isLoading: boolean;
};

class App extends Component<Props, {}> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      document.body.style.backgroundColor = this.props.theme.body;
    }
  }

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

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyles />
          <ScrollToTop>
            <Header />
            <AppSidebar />
            <ModalSwitch
              modalPath="/r/:subreddit/comments/:postId/:postTitle"
              modal={PostModal}
            >
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
                path="/r/:subreddit/comments/:postId/:postTitle"
                component={PostPage}
              />
              <Route path="/r/:subreddit/search" component={SubredditSearch} />
              <Route path="/search" component={Searchpage} />
              <Route path="/testinggrounds" component={TestingGrounds} />
              <Route component={NotfoundPage} />
            </ModalSwitch>
          </ScrollToTop>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
