import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

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

type Props = {
  theme: {
    body: string;
  };
};

class App extends Component<Props, {}> {
  componentDidUpdate(prevProps: Props) {
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
              <Route path="/testinggrounds" component={TestingGrounds} />
              <Route component={NotfoundPage} />
            </ModalSwitch>
          </GlobalStyles>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}

export default App;