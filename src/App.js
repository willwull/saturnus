import React from "react";
import { Switch, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import Header from "components/Header";
import Frontpage from "pages/Frontpage";
import NotfoundPage from "pages/NotfoundPage";

function App() {
  return (
    <ScrollToTop>
      <Header />
      <Switch>
        <Route exact path="/" component={Frontpage} />
        <Route component={NotfoundPage} />
      </Switch>
    </ScrollToTop>
  );
}

export default App;
