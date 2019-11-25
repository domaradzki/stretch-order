import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { graphql } from "react-apollo";

import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersQuery from "../../graphql/queries/getOrdersQuery";

import { Table, Button, Segment, Pagination } from "semantic-ui-react";
import "./AcceptedOrderView.css";

import DetailsView from "../DetailsView/DetailsView";

class AcceptedOrderView extends Component {
  componentDidMount() {
    this.props.changePagination(0);
  }

  handlePaginationChange = (event, { activePage }) => {
    this.props.changePagination(activePage - 1);
  };

  handleClick = (event, data) => {
    console.log(event.target);
  };

  render() {
    const userOrders = this.props.data.orders;
    const { pagination } = this.props;
    return (
      <div className="acceptedorder__container">
        <DetailsView />
        {this.props.data.loading ? (
          <Segment loading color="grey">
            <div className="empty__container" />
          </Segment>
        ) : (
          <Table celled striped selectable inverted color="grey" key="grey">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data zamówienia</Table.HeaderCell>
                <Table.HeaderCell>Klient</Table.HeaderCell>
                <Table.HeaderCell>Zamówienie</Table.HeaderCell>
                <Table.HeaderCell>Kod</Table.HeaderCell>
                <Table.HeaderCell>Wartość</Table.HeaderCell>
                <Table.HeaderCell>Data realizacji</Table.HeaderCell>
                <Table.HeaderCell>Data wpłaty</Table.HeaderCell>
                <Table.HeaderCell>Faktura</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Szczegóły</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {userOrders
                .map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell singleLine>
                      {moment(order.document.dateInsert).format("DD-MM-YYYY")}
                    </Table.Cell>
                    <Table.Cell>{order.document.client.name}</Table.Cell>
                    <Table.Cell>{order.document.signature}</Table.Cell>
                    <Table.Cell>{order.code}</Table.Cell>
                    <Table.Cell singleLine>{order.netValue}</Table.Cell>
                    <Table.Cell singleLine>
                      {order.document.dateOfRealisation}
                    </Table.Cell>
                    <Table.Cell singleLine>
                      {order.document.dateOfPay}
                    </Table.Cell>
                    <Table.Cell>{order.document.invoice}</Table.Cell>
                    <Table.Cell>{"status"}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={this.handleClick}>Edytuj</Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                .slice(pagination, pagination + 10)}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="10">
                  <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(userOrders.length / 10)}
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

const mapStateToProps = state => {
  return {
    pagination: state.interfaceMenu.paginationMain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePagination: value => dispatch(changePaginationMainView(value))
  };
};

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
const graphqlQuery = graphql(getOrdersQuery);

export default compose(reduxWrapper, graphqlQuery)(AcceptedOrderView);
