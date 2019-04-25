import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { fetchData, getDataLoading } from "../../ducks/data";
import { changePaginationMainView, activateDetails } from "../../ducks/interfaceMenu";
import { Table, Button } from "semantic-ui-react";

import "./MainView.css";
import DetailsView from "../DetailsView/DetailsView";

class MainView extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  handlePaginationChange = event => {
    const paginationPage = event.target.value;
    const { changePagination } = this.props;
    changePagination(paginationPage);
  };

  handleClick = id =>{
    const { activateDetails } = this.props;
    activateDetails(id);
  };

  render() {
    const { pagination, active } = this.props;
    const paginationButton =
      pagination === 0 ? pagination : pagination / 10 - 1;
    const newOrders = this.props.data;
    return (
      <div className="mainview__container">
      <DetailsView />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Data zamówienia</Table.HeaderCell>
              <Table.HeaderCell>Klient</Table.HeaderCell>
              <Table.HeaderCell>Nr</Table.HeaderCell>
              <Table.HeaderCell>Kod</Table.HeaderCell>
              <Table.HeaderCell>Ilość</Table.HeaderCell>
              <Table.HeaderCell>Cena</Table.HeaderCell>
              <Table.HeaderCell>Wartość</Table.HeaderCell>
              <Table.HeaderCell>Uwagi</Table.HeaderCell>
              <Table.HeaderCell>Opcje</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {newOrders
              .map(order => (
                <Table.Row key={order.itemId}>
                  <Table.Cell>
                    {moment(order.dateInsert).format("DD-MM-YYYY")}
                  </Table.Cell>
                  <Table.Cell>{order.client}</Table.Cell>
                  <Table.Cell>{order.signature}</Table.Cell>
                  <Table.Cell>{order.code}</Table.Cell>
                  <Table.Cell>{order.quantity}</Table.Cell>
                  <Table.Cell>{order.price}</Table.Cell>
                  <Table.Cell>{order.netValue}</Table.Cell>
                  <Table.Cell>{order.details}</Table.Cell>
                  <Table.Cell><Button active={active} onClick={()=> this.handleClick(order.itemId)}>
            Zadysponuj
          </Button></Table.Cell>
                </Table.Row>
              ))
              .slice(pagination, pagination + 10)}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="8">
                <div className="pagination">
                  {Array.from({
                    length: Math.ceil(newOrders.length / 10)
                  })
                    .map((button, index) => (
                      <button
                        className="ui button"
                        key={index}
                        value={index}
                        onClick={this.handlePaginationChange}
                      >
                        {index + 1}
                      </button>
                    ))
                    .slice(paginationButton, paginationButton + 5)}
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

MainView.defaultProps = {
  isLoadingData: true
};

const mapStateToProps = state => {
  return {
    data: state.data.data,
    isLoadingData: getDataLoading(state),
    pagination: state.interfaceMenu.paginationMain,
    active: state.interfaceMenu.activeDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changePagination: value => dispatch(changePaginationMainView(value)),
    activateDetails: id => dispatch(activateDetails(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
