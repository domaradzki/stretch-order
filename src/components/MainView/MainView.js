import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchData, getDataLoading } from "../../ducks/data";

class MainView extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <div>Main</div>;
  }
}

MainView.defaultProps = {
  isLoadingData: true
};

const mapStateToProps = state => {
  return {
    data: state.data.data,
    isLoadingData: getDataLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
