import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { graphql } from "react-apollo";

import { fetchData, getDataLoading, activateDetails } from "../../ducks/data";
import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersItemid from "../../graphql/queries/getOrdersItemid";

import { Table, Button, Segment, Pagination } from "semantic-ui-react";
import "./MainView.css";

import DetailsView from "../DetailsView/DetailsView";

class MainView extends Component {
  componentDidMount() {
    this.props.changePagination(0);
    this.props.fetchData();
  }

  handlePaginationChange = (event, { activePage }) => {
    this.props.changePagination(activePage - 1);
  };

  handleClick = (event, data) => {
    const { activateDetails } = this.props;
    const { id, name, kind } = data;
    activateDetails(id, name, kind);
  };

  render() {
    const ordersAlreadyInDB = this.props.data.loading
      ? []
      : this.props.data.orders.map(order => order.itemId);
    const { pagination } = this.props;
    const newOrders = this.props.datas;
    const filteredOrders = newOrders.filter(order => {
      return !ordersAlreadyInDB.includes(order.itemId);
    });
    return (
      <div className="mainview__container">
        <DetailsView />
        {this.props.isLoadingData && this.props.data.loading ? (
          <Segment loading color="grey">
            <div className="empty__container" />
          </Segment>
        ) : (
          <Table celled striped selectable inverted color="grey" key="grey">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data zamówienia</Table.HeaderCell>
                <Table.HeaderCell>Klient</Table.HeaderCell>
                <Table.HeaderCell>Nr</Table.HeaderCell>
                <Table.HeaderCell>Kod</Table.HeaderCell>
                <Table.HeaderCell>Ilość</Table.HeaderCell>
                <Table.HeaderCell>Cena</Table.HeaderCell>
                <Table.HeaderCell>Wartość</Table.HeaderCell>
                <Table.HeaderCell>Opcje</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredOrders
                .map(order => (
                  <Table.Row key={order.itemId}>
                    <Table.Cell singleLine>
                      {moment(order.dateInsert).format("DD-MM-YYYY")}
                    </Table.Cell>
                    <Table.Cell>{order.client}</Table.Cell>
                    <Table.Cell>{order.signature}</Table.Cell>
                    <Table.Cell>{order.code}</Table.Cell>
                    <Table.Cell singleLine>
                      {order.quantity} {order.unit}
                    </Table.Cell>
                    <Table.Cell singleLine>
                      {order.price} {order.currency}
                    </Table.Cell>
                    <Table.Cell singleLine>
                      {order.netValue} {order.currency}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        id={order.itemId}
                        name={order.type}
                        kind={order.kind}
                        onClick={this.handleClick}
                      >
                        Zadysponuj
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                .slice(pagination, pagination + 10)}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="8">
                  <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(filteredOrders.length / 10)}
                    onPageChange={this.handlePaginationChange}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
      </div>
    );
  }
}

MainView.defaultProps = {
  isLoadingData: true
};

const mapStateToProps = state => {
  return {
    datas: state.data.data,
    isLoadingData: getDataLoading(state),
    pagination: state.interfaceMenu.paginationMain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changePagination: value => dispatch(changePaginationMainView(value)),
    activateDetails: (id, name, kind) =>
      dispatch(activateDetails(id, name, kind))
  };
};

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
const graphqlQuery = graphql(getOrdersItemid);

export default compose(reduxWrapper, graphqlQuery)(MainView);
