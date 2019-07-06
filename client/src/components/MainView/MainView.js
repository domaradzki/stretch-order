import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { fetchData, getDataLoading, activateDetails } from "../../ducks/data";
import { changePaginationMainView } from "../../ducks/interfaceMenu";

import { Table, Button, Segment } from "semantic-ui-react";
import "./MainView.css";

import DetailsView from "../DetailsView/DetailsView";

const getQuery = gql`
  {
    orders {
      dateInsert
      client {
        name
      }
      signature
      symbol
      address {
        deliveryAddress
      }
      address2 {
        deliveryAddress
      }
      items {
        price
        quantity
        assortment {
          name
          code
          kind {
            name
          }
          type {
            name
          }
        }
      }
      details
      closed
      documentStatus
      trader {
        user {
          name
        }
      }
    }
  }
`;

class MainView extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  handlePaginationChange = event => {
    const paginationPage = event.target.value;
    const { changePagination } = this.props;
    changePagination(paginationPage);
  };

  handleClick = (event, data) => {
    const { activateDetails } = this.props;
    const id = data.id;
    const name = data.name;
    const kind = data.kind;
    activateDetails(id, name, kind);
  };

  render() {
    console.log(this.props);
    const { pagination } = this.props;
    const paginationButton =
      pagination === 0 ? pagination : pagination / 10 - 1;
    const newOrders = this.props.datas;
    return (
      <div className="mainview__container">
        <DetailsView />
        {this.props.isLoadingData ? (
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
              {newOrders
                .map((order, index) => (
                  <Table.Row key={index}>
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
    //active: state.data.activeDetails
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

const reduxWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);
const reduxGQL = graphql(getQuery);

export default compose(
  reduxWrapper,
  reduxGQL
)(MainView);
