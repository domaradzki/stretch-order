import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navigation from "../../components/Navigation/Navigation";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
    </div>
  );
};

export default Dashboard;
