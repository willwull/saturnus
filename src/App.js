import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import AppSidebar from "containers/AppSidebar";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";
import SubredditPage from "pages/SubredditPage";
import PostPage from "pages/PostPage";
import TestingGrounds from "pages/TestingGrounds";

function App({ theme }) {
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

App.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default App;
