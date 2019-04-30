import React, { Component } from "react";

import { connect } from "react-redux";
import { Segment  } from "semantic-ui-react";

import "./DetailsView.css";
import { unactivateDetails } from "../../ducks/data";
import FormOrderTPD from "../FormOrderTPD/FormOrderTPD";

class DetailsView extends Component {
  render() {
    const { active } = this.props;
    
    return (
      <div
        className={active ? "details__container" : "details__container--hidden"}
      >
        {active && (
          <Segment color="blue">
            <FormOrderTPD />
          </Segment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.data.activeDetails
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
