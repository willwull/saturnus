import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import AppSidebar from "containers/AppSidebar";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";
import SubredditPage from "pages/SubredditPage";
import PostPage from "pages/PostPage";
import TestingGrounds from "pages/TestingGrounds";

/*

a {
  color: ${props => props.theme.primary};
}

*/
const GlobalStyles = styled.div`
  background: ${props => props.theme.body};
  color: ${props => props.theme.text};

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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      document.body.style.backgroundColor = this.props.theme.body;
    }
  }

  render() {
    const { theme } = this.props;
    const subSortOptions = "hot|top|new|controversial|rising";
    const frontSortOptions = `${subSortOptions}|best`;

    return (
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <GlobalStyles>
            <Header />
            <AppSidebar />
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
                path="/r/:subreddit/comments/:postId/:postTitle"
                component={PostPage}
              />
              <Route path="/testinggrounds" component={TestingGrounds} />
              <Route component={NotfoundPage} />
            </Switch>
          </GlobalStyles>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}

export default App;
