import React from "react";
import ReactDOM from "react-dom";
import fontawesome from "@fortawesome/fontawesome";
import faSolid from "@fortawesome/fontawesome-pro-solid";
import faBrands from "@fortawesome/fontawesome-free-brands";
import "normalize.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.scss";

fontawesome.library.add(faSolid, faBrands);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
