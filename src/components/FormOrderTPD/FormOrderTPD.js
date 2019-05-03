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
    const detail2 = pickedOrder.postfix();
    for (let key in pickedOrder) {
      if (pickedOrder.hasOwnProperty(key)) {
        key === "details"
          ? this.props.changeInput(key, (`${pickedOrder[key]} ${detail2}`))
          : typeof pickedOrder[key] === "function"
          ? this.props.changeInput(key, pickedOrder[key]())
          : this.props.changeInput(key, pickedOrder[key]);
      }
    }
  }

  handleChangeInput = (event, data) => {
    const name = data.name;
    const value = data.value;
    this.props.changeInput(name, value);
  };

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.props.changeDate();
    this.setState({
      selectedDay: moment(selectedDay).format("YYYY-MM-DD")
      // isEmpty: !input.value.trim(),
      // isValidDay: typeof selectedDay !== "undefined",
      // isDisabled: modifiers.disabled === true
    });
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.unactivateDetails();
  };

  handleAddOrder = event => {
    event.preventDefault();
    console.log("added");
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
      roller,
      postfix,
      invoice,
      dateOfPay,
      color1,
      color2,
      color3,
      dateOfAcceptation,
      dateOfRealisation
    } = this.props;
    return (
      <Form>
        <Segment color="blue">
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
              value={printName}
              name="printName"
              label="Nadruk"
              placeholder="Nadruk"
              width={6}
              onChange={this.handleChangeInput}
            />
            <div className="three wide field">
              <label>Data zamówienia</label>
              <DayPickerInput
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                onDayChange={this.handleDayChange}
                selectedDay={moment(dateInsert).format("YYYY-MM-DD")}
                value={moment(dateInsert).format("YYYY-MM-DD")}
              />
            </div>
            <div className="three wide field">
              <label>Data akceptacji</label>
              <DayPickerInput
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                onDayChange={this.handleDayChange}
                selectedDay={this.props.dateOfAcceptation}
              />
            </div>
            <div className="three wide field">
              <label>Termin realizacji</label>
              <DayPickerInput
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                onDayChange={this.handleDayChange}
                selectedDay={this.props.dateOfRealisation}
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
            <Form.Input
              value={tapeLong}
              name="tapeLong"
              label="Długość"
              placeholder="Długość"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={tapeWidth}
              name="tapeWidth"
              label="Szerokość"
              placeholder="Szerokość"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={tapeThickness}
              name="tapeThickness"
              label="Grubość"
              placeholder="Grubość"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={glue}
              name="glue"
              label="Klej"
              placeholder="Klej"
              width={3}
              onChange={this.handleChangeInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              value={roller}
              name="roller"
              label="Wałek"
              placeholder="Wałek"
              width={2}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={tapeColor}
              name="tapeColor"
              label="Kolor taśmy"
              placeholder="Kolor taśmy"
              width={2}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={numberOfColors}
              name="numberOfColors"
              label="Ilość kolorów"
              placeholder="Ilość kolorów"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={color1}
              name="color1"
              label="Color 1"
              placeholder="Color 1"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={color2}
              name="color2"
              label="Color 2"
              placeholder="Color 2"
              width={3}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={color3}
              name="color3"
              label="Color 3"
              placeholder="Color 3"
              width={3}
              onChange={this.handleChangeInput}
            />
          </Form.Group>
        </Segment>
        <Segment color="blue">
          <Form.Group>
            <Form.Input
              //  value={price}
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
              //   value={netValue}
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
            <div className="four wide field">
              <label>Data płatności</label>
              <DayPickerInput
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                onDayChange={this.handleDayChange}
                selectedDay={this.props.dateOfPay}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Select
              name="transport"
              label="Transport"
              placeholder="Transport"
              width={4}
              options={[
                { key: 1, value: "Goodmark", text: "Goodmark" },
                { key: 2, value: "Odbiór własny", text: "Odbiór własny" },
                { key: 3, value: "Paczka", text: "Paczka" },
                { key: 4, value: "Paleta euro", text: "Paleta euro" },
                { key: 5, value: "Paleta max", text: "Paleta max" }
              ]}
              onChange={this.handleChangeInput}
            />
            <Form.Input
              value={details}
              name="details"
              label="Uwagi"
              placeholder="Uwagi"
              width={12}
              onChange={this.handleChangeInput}
            />
          </Form.Group>
        </Segment>
        <Segment textAlign="center">
          <Button onClick={this.handleAddOrder}>Potwierdź</Button>
          <Button onClick={this.handleCancel}>Anuluj</Button>
        </Segment>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    client: state.orders.client,
    printName: state.orders.printName,
    tapeLong: state.orders.tapeLong,
    tapeWidth: state.orders.tapeWidth,
    tapeThickness: state.orders.tapeThickness,
    numberOfColors: state.orders.numberOfColors,
    tapeColor: state.orders.tapeColor,
    color1: state.orders.color1,
    color2: state.orders.color2,
    color3: state.orders.color3,
    glue: state.orders.glue,
    roller: state.orders.roller,
    dateOfAcceptation: state.orders.dateOfAcceptation,
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
