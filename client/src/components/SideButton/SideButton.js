import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));

const SideButton = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div {...props} className={classes.toolbarIcon}>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
    </div>
  );
};

export default SideButton;
