import React, { Component } from "react";

import { connect } from "react-redux";

import "./DetailsView.css";
import { unactivateDetails, pickedOrder } from "../../ducks/data";
import FormOrderTPD from "../FormOrderTPD/FormOrderTPD";
import FormOrderFSRG from "../FormOrderFSRG/FormOrderFSRG";

class DetailsView extends Component {
  render() {
    const { active, activeType } = this.props;
    return (
      <div
        className={active ? "details__container" : "details__container--hidden"}
      >
        {active && activeType === "TPD" ? (
          <FormOrderTPD />
        ) : active && activeType === "FS" ? (
          <FormOrderFSRG />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.data.activeDetails,
    activeType: state.data.activeType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unactivateDetails: () => dispatch(unactivateDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsView);
