import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

import { changeInput, changeDate } from "../../ducks/orders";

class FormOrderTPD extends Component {
  handleChangeInput = (event, data) => {
    const name = data.name;
    const value = data.value;
    this.props.changeInput(name, value);
  };
  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay: moment(selectedDay).format("YYYY-MM-DD")
      // isEmpty: !input.value.trim(),
      // isValidDay: typeof selectedDay !== "undefined",
      // isDisabled: modifiers.disabled === true
    });
  };

  handleAddOrder = event => {
    event.preventDefault();
    console.log("added");
  };
  render() {
    const {
      printName,
      client,
      invoice,
      dateOfPay,
      quantity,
      tapeLong,
      tapeWidth,
      tapeThickness,
      numberOfColors,
      color1,
      color2,
      color3,
      glue,
      roller,
      dateOfAcceptation,
      transport,
      trader,
      dateOfRealisation,
      details
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
          <Form.Select
            name="kind"
            label="Towar"
            placeholder="Towar"
            width={3}
            options={[
              { key: 1, value: "FS", text: "FS" },
              { key: 2, value: "TPD", text: "TPD" },
              { key: 3, value: "TP", text: "TP" },
              { key: 4, value: "INNE", text: "INNE" }
            ]}
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
          {/* <Form.Input
            value={dateOfPay}
            name="dateOfPay"
            label="Data płatności"
            placeholder="Data płatności"
            width={4}
            onChange={this.handleChangeInput}
          /> */}
          <div className="three wide field">
            <label>Data płatności</label>
            <DayPickerInput
              placeholder={moment(new Date()).format("YYYY-MM-DD")}
              onDayChange={this.handleDayChange}
              selectedDay={this.props.dateOfPay}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Input
            value={quantity}
            name="quantity"
            label="Ilość"
            placeholder="Ilość"
            type="number"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={price}
            name="price"
            label="Cena"
            placeholder="Cena"
            type="number"
            min="0.00"
            max="100000.00"
            step="0.01"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Input
            value={netValue}
            name="netValue"
            label="Wartość"
            placeholder="Wartość"
            type="number"
            min="0.00"
            max="100000.00"
            step="0.01"
            width={4}
            onChange={this.handleChangeInput}
          />
          <Form.Select
            name="margin"
            label="Marża"
            placeholder="Marża"
            width={4}
            options={[
              { key: 1, value: "0", text: "0" },
              { key: 2, value: "0.25", text: "0.25" },
              { key: 3, value: "0.5", text: "0.5" },
              { key: 4, value: "1", text: "1" },
              { key: 5, value: "2", text: "2" },
              { key: 6, value: "3", text: "3" }
            ]}
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
        <Button onClick={this.handleAddOrder}>Dodaj zamówienie</Button>
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
    changeInput: (name, value) => dispatch(changeInput(name, value)),
    changeDate: (dateOfPay, value) => dispatch(changeDate(dateOfPay, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormOrderTPD);
