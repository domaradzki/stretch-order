import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  }
}));

const Hamburger = ({ open, ...props }) => {
  const classes = useStyles();
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      {...props}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default Hamburger;
