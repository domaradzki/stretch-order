import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../src/assets/styles/theme";
import "typeface-roboto";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store";

import * as serviceWorker from "./serviceWorker";
import Root from "./layouts/Root/Root";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Root />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
