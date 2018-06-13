import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, injectGlobal } from "styled-components";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import AppSidebar from "containers/AppSidebar";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";
import SubredditPage from "pages/SubredditPage";
import PostPage from "pages/PostPage";
import TestingGrounds from "pages/TestingGrounds";

class App extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.setGlobalStyles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.setGlobalStyles();
    }
  }

  setGlobalStyles() {
    const { theme } = this.props;
    injectGlobal`
        body {
          background: ${theme.body};
          color: ${theme.text}
        }

        a {
          color: ${theme.primary}
        }

        blockquote {
          background: ${theme.body}
        }

        .op {
          color: ${theme.primary};
        }
      `;
  }

  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ScrollToTop>
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
