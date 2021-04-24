import * as ReactDOM from "react-dom";
import * as i18n from "./translations";
import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";
import App from "./app";

ReactDOM.render(React.createElement(App, { i18n }, null), document.getElementById("app"));
