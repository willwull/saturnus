import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "@marionebl/styled-components";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import AppSidebar from "containers/AppSidebar";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";
import SubredditPage from "pages/SubredditPage";
import PostPage from "pages/PostPage";
import TestingGrounds from "pages/TestingGrounds";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.text}
  }

  a {
    color: ${props => props.theme.primary}
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

class App extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <GlobalStyles />
          <Header />
          <AppSidebar />
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route exact path="/r/:subreddit" component={SubredditPage} />
            <Route
              path="/r/:subreddit/comments/:postId/:postTitle"
              component={PostPage}
            />
            <Route path="/testinggrounds" component={TestingGrounds} />
            <Route component={NotfoundPage} />
          </Switch>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}

export default App;
