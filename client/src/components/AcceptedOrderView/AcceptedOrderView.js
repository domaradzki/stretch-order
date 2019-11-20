import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { graphql } from "react-apollo";

import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersQuery from "../../graphql/queries/getOrdersQuery";

import { Table, Button, Segment } from "semantic-ui-react";
import "./AcceptedOrderView.css";

import DetailsView from "../DetailsView/DetailsView";

class AcceptedOrderView extends Component {
  componentDidMount() {}

  handlePaginationChange = event => {
    const paginationPage = event.target.value;
    const { changePagination } = this.props;
    changePagination(paginationPage);
  };

  handleClick = (event, data) => {
    const { activateDetails } = this.props;
  };

  render() {
    console.log(this.props);
    const userOrders = this.props.data.orders;
    const { pagination } = this.props;
    return (
      <div className="acceptedorder__container">
        <DetailsView />
        {this.props.data.loading ? (
          <Segment loading>
            <div className="empty__container" />
          </Segment>
        ) : (
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
              {userOrders
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
            {/* <Table.Footer>
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
            </Table.Footer> */}
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

const reduxWrapper = connect(mapStateToProps);
const graphqlQuery = graphql(getOrdersQuery);

export default compose(reduxWrapper, graphqlQuery)(AcceptedOrderView);
