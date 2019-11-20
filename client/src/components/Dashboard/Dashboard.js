import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import { connect } from "react-redux";

import "./Dashboard.css";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import MainView from "../MainView/MainView";
import AcceptedOrderView from "../AcceptedOrderView/AcceptedOrderView";

class Dashboard extends Component {
  render() {
    const activeItem = this.props.activeItem;
    return (
      <div className="dashboard__container">
        <h1>Dashboard</h1>
        <DashboardMenu />{" "}
        <Segment attached="bottom">
          {activeItem === "oczekujące" && <MainView />}
          {activeItem === "zlecone" && <AcceptedOrderView />}
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
