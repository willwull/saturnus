import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSafari } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import "intersection-observer"; // mostly for Safari
import "normalize.css";

import reducer from "./reducers";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

library.add(faSafari, fas, far);

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if ((module as any).hot) {
  (module as any).hot.accept("./Root", () => {
    const NextRoot = require("./Root").default; // eslint-disable-line global-require
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <NextRoot />
        </Router>
      </Provider>,
      document.getElementById("root"),
    );
  });
}
