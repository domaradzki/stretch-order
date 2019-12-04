import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navigation from "../Navigation/Navigation";

import { makeStyles } from "@material-ui/core/styles";
import MainContainer from "../MainContainer/MainContainer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <MainContainer />
    </div>
  );
}
