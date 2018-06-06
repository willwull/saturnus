import React from "react";
import { Switch, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";
import SubredditPage from "pages/SubredditPage";

function App() {
  return (
    <ScrollToTop>
      <Header />
      <Switch>
        <Route exact path="/" component={Frontpage} />
        <Route path="/r/:subreddit" component={SubredditPage} />
        <Route component={NotfoundPage} />
      </Switch>
    </ScrollToTop>
  );
}

export default App;
