import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchData, getDataLoading } from "../../ducks/data";
import {  Menu, Icon, Table, Label } from "semantic-ui-react";

import "./MainView.css";

class MainView extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
      //const {dateInsert, client, signature, code, quantity, price, netValue, details} = this.props.data;
      const newOrders = this.props.data.slice()
    return <div className="mainview__div--container">
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
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {newOrders.map(order=>(
            <Table.Row key={order.itemId}>
            <Table.Cell>{order.dateInsert}</Table.Cell>
            <Table.Cell>{order.client}</Table.Cell>
            <Table.Cell>{order.signature}</Table.Cell>
            <Table.Cell>{order.code}</Table.Cell>
            <Table.Cell>{order.quantity}</Table.Cell>
            <Table.Cell>{order.price}</Table.Cell>
            <Table.Cell>{order.netValue}</Table.Cell>
            <Table.Cell>{order.details}</Table.Cell>
          </Table.Row>

        ))} 
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='8'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
    </div>;
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
