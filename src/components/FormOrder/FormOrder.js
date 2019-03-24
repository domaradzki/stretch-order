import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";

import { changeInput } from "../../ducks/orders";

class FormOrder extends Component {
  handleChangeInput = (event, data) => {
    console.log(data.name);
    const name = data.name;
    const value = data.value;
    this.props.changeInput(name, value);
  };
  render() {
    const {
      client,
      kind,
      invoice,
      dateOfPay,
      quantity,
      price,
      netValue,
      margin,
      comments
    } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Input
            value={client}
            name="client"
            label="Klient"
            placeholder="Klient"
            width={6}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={kind}
            name="kind"
            label="Towar"
            placeholder="Towar"
            width={3}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={invoice}
            name="invoice"
            label="Faktura"
            placeholder="Faktura"
            width={3}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={dateOfPay}
            name="dateOfPay"
            label="Data płatności"
            placeholder="Data płatności"
            width={4}
            onChange={this.handleChangeInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            value={quantity}
            name="quantity"
            label="Ilość"
            placeholder="Ilość"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={price}
            name="price"
            label="Cena"
            placeholder="Cena"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={netValue}
            name="netValue"
            label="Wartość"
            placeholder="Wartość"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={margin}
            name="margin"
            label="Marża"
            placeholder="Marża"
            width={4}
            onChange={this.handleChangeInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            value={comments}
            name="comments"
            label="Uwagi"
            placeholder="Uwagi"
            width={16}
            onChange={this.handleChangeInput}
          />
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    client: state.orders.client,
    kind: state.orders.kind,
    invoice: state.orders.invoice,
    dateOfPay: state.orders.dateOfPay,
    quantity: state.orders.quantity,
    price: state.orders.price,
    netValue: state.orders.netValue,
    margin: state.orders.margin,
    comments: state.orders.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: (name, value) => dispatch(changeInput(name, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormOrder);
