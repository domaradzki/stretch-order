import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CameraRollIcon from "@material-ui/icons/CameraRoll";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import SettingsIcon from "@material-ui/icons/Settings";

export const mainListItems = (
  <div>
    <NavLink to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink to="/new">
      <ListItem button>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Nowe" />
      </ListItem>
    </NavLink>
    <NavLink to="/orders">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Zlecone" />
      </ListItem>
    </NavLink>
    <NavLink to="/tape">
      <ListItem button>
        <ListItemIcon>
          <InsertPhotoIcon />
        </ListItemIcon>
        <ListItemText primary="Nadruk" />
      </ListItem>
    </NavLink>
    <NavLink to="/stretch">
      <ListItem button>
        <ListItemIcon>
          <CameraRollIcon />
        </ListItemIcon>
        <ListItemText primary="Stretch" />
      </ListItem>
    </NavLink>
    <NavLink to="/transport">
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Transport" />
      </ListItem>
    </NavLink>
    <NavLink to="/raports">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reporty" />
      </ListItem>
    </NavLink>
    <NavLink to="/settings">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Ustawienia" />
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
  </div>
);
