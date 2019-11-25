import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { graphql } from "react-apollo";

import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersTapeQuery from "../../graphql/queries/getOrdersTapeQuery";

import { Table, Button, Segment, Pagination } from "semantic-ui-react";
import "./TapeProductionView.css";

class TapeProductionView extends Component {
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
    const tapeOrders = this.props.data.tapes;
    const { pagination } = this.props;
    return (
      <div className="tapeproduction__container">
        {this.props.data.loading ? (
          <Segment loading color="blue">
            <div className="empty__container" />
          </Segment>
        ) : (
          <Table celled striped selectable inverted color="blue" key="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Miniatura</Table.HeaderCell>
                <Table.HeaderCell>Nadruk</Table.HeaderCell>
                <Table.HeaderCell>Wałek</Table.HeaderCell>
                <Table.HeaderCell>Segregator</Table.HeaderCell>
                <Table.HeaderCell>Projekt</Table.HeaderCell>
                <Table.HeaderCell>Termin</Table.HeaderCell>
                <Table.HeaderCell>Ilość</Table.HeaderCell>
                <Table.HeaderCell>Długość</Table.HeaderCell>
                <Table.HeaderCell>Szerokość</Table.HeaderCell>
                <Table.HeaderCell>Klej</Table.HeaderCell>
                <Table.HeaderCell>Taśma</Table.HeaderCell>
                <Table.HeaderCell>Reszta</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tapeOrders
                .map(tape => (
                  <Table.Row key={tape.id}>
                    <Table.Cell>{"img"}</Table.Cell>
                    <Table.Cell>{tape.printName}</Table.Cell>
                    <Table.Cell>{tape.roller}</Table.Cell>
                    <Table.Cell>{"seg"}</Table.Cell>
                    <Table.Cell>{"projectNR"}</Table.Cell>
                    <Table.Cell>
                      {tape.order.document.dateOfRealisation}
                    </Table.Cell>
                    <Table.Cell>{tape.order.quantity}</Table.Cell>
                    <Table.Cell>{tape.tapeLong}</Table.Cell>
                    <Table.Cell>{tape.tapeWidth}</Table.Cell>
                    <Table.Cell>{tape.glue}</Table.Cell>
                    <Table.Cell>{tape.tapeColor}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={this.handleClick}>Pokaż</Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                .slice(pagination, pagination + 10)}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="12">
                  <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(tapeOrders.length / 10)}
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
const graphqlQuery = graphql(getOrdersTapeQuery);

export default compose(reduxWrapper, graphqlQuery)(TapeProductionView);
