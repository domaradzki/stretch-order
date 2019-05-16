import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

import { changeInput, changeDate } from "../../ducks/orders";
import { unactivateDetails, pickedOrder } from "../../ducks/data";

class FormOrderTPD extends Component {
  componentDidMount() {
    const { pickedOrder } = this.props;
  }

  handleChangeInput = (event, data) => {
    const name = data.name;
    const value = data.value;
    this.props.changeInput(name, value);
  };

  handleDayChange = (selectedDay, dayPickerInput) => {
    const name = dayPickerInput.props.name;
    selectedDay = moment(selectedDay).format("YYYY-MM-DD");
    this.props.changeDate(name, selectedDay);
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.unactivateDetails();
  };

  handleAddOrder = event => {
    event.preventDefault();
    console.log("added");
    const {
      client,
      quantity,
      price,
      netValue,
      details,
      dateInsert,
      invoice,
      dateOfPay,
      dateOfRealisation
    } = this.props;
    const order = {
      client,
      quantity,
      price,
      netValue,
      details,
      dateInsert: moment(dateInsert).format("YYYY-MM-DD"),
      invoice,
      dateOfPay,
      dateOfRealisation
    };
    console.log(order);
  };
  render() {
    const {
      printName,
      client,
      quantity,
      price,
      netValue,
      details,
      dateInsert,
      tapeLong,
      tapeWidth,
      tapeThickness,
      tapeColor,
      numberOfColors,
      glue,
      dateOfPay,
      color1,
      color2,
      color3,
      dateOfAcceptation,
      dateOfRealisation
    } = this.props;
    return (
      <Segment color="blue">
      <h3>Zlecenie pakowania i wysyłki towaru z magazynu</h3>
        <Form>
          <Segment color="blue">
            <Form.Group>
              <Form.Input
                value={client}
                name="client"
                label="Klient"
                placeholder="Klient"
                width={8}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
            <Form.Group>
              <div className="four wide field">
                <label>Zamówienie</label>
                <DayPickerInput
                  onDayChange={this.handleDayChange}
                  selectedDay={moment(dateInsert).format("YYYY-MM-DD")}
                  value={moment(dateInsert).format("YYYY-MM-DD")}
                  name="dateInsert"
                />
              </div>
              <div className="four wide field">
                <label>Realizacja</label>
                <DayPickerInput
                  onDayChange={this.handleDayChange}
                  selectedDay={dateOfRealisation}
                  value={moment(dateInsert)
                    .add(1, "days")
                    .format("YYYY-MM-DD")}
                  placeholder={moment(new Date()).format("YYYY-MM-DD")}
                  name="dateOfRealisation"
                />
              </div>
              <div className="four wide field">
                <label>Płatność</label>
                <DayPickerInput
                  placeholder={moment(new Date()).format("YYYY-MM-DD")}
                  onDayChange={this.handleDayChange}
                  selectedDay={dateOfPay}
                  name="dateOfRealisation"
                />
              </div>
            </Form.Group>
          </Segment>
          <Segment color="blue">
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
             
              
            </Form.Group>
            <Form.Group>
              
            </Form.Group>
          </Segment>
          <Segment color="blue">
            <Form.Group>
              <Form.Input
                name="price"
                value={price}
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
                name="netValue"
                value={netValue}
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
                fluid
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
              <Form.Select
                fluid
                name="transport"
                label="Transport"
                placeholder="Transport"
                width={4}
                options={[
                  { key: 1, value: "Goodmark", text: "Goodmark" },
                  { key: 2, value: "Odbiór własny", text: "Odbiór własny" },
                  { key: 3, value: "Paczka", text: "Paczka" },
                  { key: 4, value: "Półpaleta", text: "Półpaleta" },
                  { key: 5, value: "Paleta euro", text: "Paleta euro" },
                  { key: 6, value: "Paleta max", text: "Paleta max" }
                ]}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                value={details}
                name="details"
                label="Uwagi"
                placeholder="Uwagi"
                width={16}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          </Segment>
          <Segment textAlign="center">
            <Button onClick={this.handleAddOrder}>Potwierdź</Button>
            <Button onClick={this.handleCancel}>Anuluj</Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    client: state.orders.client,
    dateOfRealisation: state.orders.dateOfRealisation,
    transport: state.orders.transport,
    kindOfPay: state.orders.kindOfPay,
    invoice: state.orders.invoice,
    dateOfPay: state.orders.dateOfPay,
    quantity: state.orders.quantity,
    price: state.orders.price,
    netValue: state.orders.netValue,
    margin: state.orders.margin,
    details: state.orders.details,
    dateInsert: state.orders.dateInsert,
    pickedOrder: pickedOrder(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: (name, value) => dispatch(changeInput(name, value)),
    changeDate: (_date, value) => dispatch(changeDate(_date, value)),
    unactivateDetails: () => dispatch(unactivateDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormOrderTPD);
