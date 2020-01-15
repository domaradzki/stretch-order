import React from "react";
import ApplicationBar from "../ApplicationBar/ApplicationBar";
import SideBar from "../SideBar/SideBar";

function Navigation() {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ApplicationBar open={open} openDrawer={handleDrawerOpen} />
      <SideBar open={open} closeDrawer={handleDrawerClose} />
    </>
  );
}

export default Navigation;
