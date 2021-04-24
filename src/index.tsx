import * as ReactDOM from "react-dom";
import * as i18n from "./i18n";
import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App";

ReactDOM.render(React.createElement(App, { i18n }, null), document.getElementById("app"));
