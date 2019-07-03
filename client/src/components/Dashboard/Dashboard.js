import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import { connect } from "react-redux";

import "./Dashboard.css";
import DashboardMenu from "../DashboardMenu";
import MainView from "../MainView";


class Dashboard extends Component {
  render() {
    const activeItem = this.props.activeItem;
    return (
      <div className="dashboard__container">
        <h1>Dashboard</h1>
        <DashboardMenu />
        {activeItem === "oczekujące" && <Segment attached='bottom'><MainView /></Segment>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeItem: state.interfaceMenu.activeItem
  };
};

export default connect(mapStateToProps)(Dashboard);
