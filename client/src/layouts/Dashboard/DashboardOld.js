import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import { connect } from "react-redux";

import DashboardMenu from "../../components/DashboardMenu/DashboardMenu";
import MainView from "../../components/MainView/MainView";
import AcceptedOrderView from "../../components/AcceptedOrderView/AcceptedOrderView";
import TapeProductionView from "../../components/TapeProductionView/TapeProductionView";
import StretchProductionView from "../../components/StretchProductionView/StretchProductionView";

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
          {activeItem === "Produkcja Stretch" && <StretchProductionView />}
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
