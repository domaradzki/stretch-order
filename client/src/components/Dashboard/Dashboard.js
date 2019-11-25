import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import { connect } from "react-redux";

import "./Dashboard.css";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import MainView from "../MainView/MainView";
import AcceptedOrderView from "../AcceptedOrderView/AcceptedOrderView";
import TapeProductionView from "../TapeProductionView/TapeProductionView";

class Dashboard extends Component {
  render() {
    const activeItem = this.props.activeItem;
    return (
      <div className="dashboard__container">
        <h1>Dashboard</h1>
        <DashboardMenu />
        <Segment attached="bottom" color="grey">
          {activeItem === "oczekujące" && <MainView />}
          {activeItem === "zlecone" && <AcceptedOrderView />}
          {activeItem === "Produkcja Nadruk" && <TapeProductionView />}
        </Segment>
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
