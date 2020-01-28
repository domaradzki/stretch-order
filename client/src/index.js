import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../src/assets/styles/theme";
import "semantic-ui-css/semantic.min.css";
import "typeface-roboto";
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

serviceWorker.unregister();
