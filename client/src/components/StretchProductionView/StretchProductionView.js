import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { graphql } from "react-apollo";

import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersStretchQuery from "../../graphql/queries/getOrdersStretchQuery";

import { Table, Button, Segment, Pagination } from "semantic-ui-react";
import "./StretchProductionView.css";

class StretchProductionView extends Component {
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
    console.log(this.props);
    const stretchOrders = this.props.data.stretches;
    const { pagination } = this.props;
    return (
      <div className="stretchproduction__container">
        {this.props.data.loading ? (
          <Segment loading color="blue">
            <div className="empty__container" />
          </Segment>
        ) : (
          <Table celled striped selectable inverted color="brown" key="brown">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Klient</Table.HeaderCell>
                <Table.HeaderCell>Termin</Table.HeaderCell>
                <Table.HeaderCell>Ilość</Table.HeaderCell>
                <Table.HeaderCell>Waga netto</Table.HeaderCell>
                <Table.HeaderCell>Tuleja</Table.HeaderCell>
                <Table.HeaderCell>Waga brutto</Table.HeaderCell>
                <Table.HeaderCell>Kolor</Table.HeaderCell>
                <Table.HeaderCell>Grubość</Table.HeaderCell>
                <Table.HeaderCell>Opcje</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stretchOrders
                .map(stretch => (
                  <Table.Row key={stretch.id}>
                    <Table.Cell>
                      {stretch.order.document.client.name}
                    </Table.Cell>
                    <Table.Cell>
                      {stretch.order.document.dateOfRealisation}
                    </Table.Cell>
                    <Table.Cell>{stretch.order.quantity}</Table.Cell>
                    <Table.Cell>{stretch.netWeight}</Table.Cell>
                    <Table.Cell>{stretch.sleeve}</Table.Cell>
                    <Table.Cell>{stretch.grossWeight}</Table.Cell>
                    <Table.Cell>{stretch.stretchColor}</Table.Cell>
                    <Table.Cell>{stretch.stretchThickness}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={this.handleClick}>Pokaż</Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                .slice(pagination, pagination + 10)}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="9">
                  <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(stretchOrders.length / 10)}
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
const graphqlQuery = graphql(getOrdersStretchQuery);

export default compose(reduxWrapper, graphqlQuery)(StretchProductionView);
