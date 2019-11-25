import React, { Component } from "react";

import { connect } from "react-redux";

import "./DetailsView.css";
import { unactivateDetails } from "../../ducks/data";
import FormOrderTPD from "../FormOrderTPD/FormOrderTPD";
import FormOrderFSRG from "../FormOrderFSRG/FormOrderFSRG";
import FormOrderPacking from "../FormOrderPacking/FormOrderPacking";

class DetailsView extends Component {
  render() {
    const { active, activeType, activeKind } = this.props;
    return (
      <div
        className={active ? "details__container" : "details__container--hidden"}
      >
        {active &&
          (activeType === "TPD" && activeKind === "KT" ? (
            <FormOrderTPD />
          ) : activeType === "FS" && activeKind === "KT" ? (
            <FormOrderFSRG />
          ) : (
            <FormOrderPacking />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.data.activeDetails,
    activeType: state.data.activeType,
    activeKind: state.data.activeKind
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unactivateDetails: () => dispatch(unactivateDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView);
