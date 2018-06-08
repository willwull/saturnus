import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import fontawesome from "@fortawesome/fontawesome";
import faSolid from "@fortawesome/fontawesome-pro-solid";
import faRegular from "@fortawesome/fontawesome-pro-regular";
import faBrands from "@fortawesome/fontawesome-free-brands";
import "normalize.css";

import reducer from "./reducers";

import Root from "./Root";
import registerServiceWorker from "./registerServiceWorker";
import "./index.scss";

fontawesome.library.add(faSolid, faBrands, faRegular);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./Root", () => {
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
