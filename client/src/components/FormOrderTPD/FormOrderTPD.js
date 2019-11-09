import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { graphql } from "react-apollo";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

import { changeInput, changeDate, clearInput } from "../../ducks/orders";
import { unactivateDetails, pickedOrder } from "../../ducks/data";

import addOrderMutation from "../../graphql/addOrderMutation";
import addDocumentMutation from "../../graphql/addDocumentMutation";
import addClientMutation from "../../graphql/addClientMutation";
import addUserMutation from "../../graphql/addUserMutation";
import addTapeMutation from "../../graphql/addTapeMutation";
import isClientInDatabase from "../../graphql/queries/isClientInDatabase";

class FormOrderTPD extends Component {
  componentDidMount() {
    const { pickedOrder } = this.props;
    const detail2 = pickedOrder.postfix();
    for (let key in pickedOrder) {
      if (key === "dateOfRealisation") {
        this.props.changeDate(key, pickedOrder[key]());
      }
      if (pickedOrder.hasOwnProperty(key)) {
        key === "details"
          ? this.props.changeInput(key, `${pickedOrder[key]} ${detail2}`)
          : typeof pickedOrder[key] === "function"
          ? this.props.changeInput(key, pickedOrder[key]())
          : this.props.changeInput(key, pickedOrder[key]);
      }
    }
  }

  handleChangeInput = (event, data) => {
    const name = event.target.name ? event.target.name : data.name;
    const value = event.target.value ? event.target.value : data.value;
    this.props.changeInput(name, value);
  };

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
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
    const {
      printName,
      client,
      trader,
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
      invoice,
      dateOfPay,
      color1,
      color2,
      color3,
      dateOfAcceptation,
      dateOfRealisation,
      deliveryAddress,
      transport,
      pickedOrder
    } = this.props;
    const {
      assortment,
      signature,
      documentStatus,
      closed,
      symbol,
      itemId,
      code,
      kind,
      type,
      numberOfDocumentInvoice,
      companyId,
      documentId
    } = pickedOrder;
    if (!this.props.data.isLoading) {
      const isClient = this.props.data.clientCheck;
      console.log(isClient);
      Promise.all([
        this.props.addTapeMutation({
          variables: {
            printName,
            dateOfAcceptation,
            numberOfColors,
            color1,
            color2,
            color3,
            glue,
            roller,
            tapeColor,
            tapeLong,
            tapeThickness,
            tapeWidth
          }
        }),
        this.props.addUserMutation({
          variables: {
            name: trader
          }
        }),
        this.props.addClientMutation({
          variables: {
            name: client,
            companyId
          }
        })
      ])
        .then(result => {
          return {
            productId: result[0].data.addTape.id,
            userId: result[1].data.addUser.id,
            clientId: result[2].data.addClient.id
          };
        })
        .then(result => {
          this.props
            .addDocumentMutation({
              variables: {
                documentId,
                dateInsert: moment(dateInsert).format("YYYY-MM-DD"),
                dateOfPay,
                dateOfRealisation,
                signature,
                symbol,
                details,
                closed,
                documentStatus,
                deliveryAddress,
                transport,
                numberOfDocumentInvoice,
                invoice,
                clientId: result.clientId,
                userId: result.userId
              }
            })
            .then(res => {
              return res.data.addDocument.id;
            })
            .then(res => {
              this.props.addOrderMutation({
                variables: {
                  itemId,
                  name: assortment,
                  code,
                  kind,
                  type,
                  quantity,
                  price,
                  netValue,
                  documentId: res,
                  productId: result.productId
                }
              });
            });
        });

      this.props.unactivateDetails();
      this.props.clearInput();
    }
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
      dateOfPay,
      color1,
      color2,
      color3,
      margin,
      transport,
      dateOfAcceptation,
      dateOfRealisation,
      deliveryAddress
    } = this.props;
    const dateOfAcceptOrOrder =
      dateInsert > dateOfAcceptation ? dateInsert : dateOfAcceptation;
    return (
      <Segment color="blue">
        <h3>Zlecenie produkcyjne taśmy pakowej z nadrukiem</h3>
        <Form lang="pl" onSubmit={this.handleAddOrder}>
          <Segment color="blue">
            <Form.Group>
              <Form.Input
                value={client}
                name="client"
                label="Klient"
                placeholder="Klient"
                width={8}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Input
                value={printName}
                name="printName"
                label="Nadruk"
                placeholder="Nadruk"
                width={8}
                onChange={this.handleChangeInput}
                required
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
                <label>Akceptacja</label>
                <DayPickerInput
                  onDayChange={this.handleDayChange}
                  selectedDay={dateOfAcceptation}
                  placeholder={moment(new Date()).format("YYYY-MM-DD")}
                  name="dateOfAcceptation"
                />
              </div>
              <div className="four wide field">
                <label>Realizacja</label>
                <DayPickerInput
                  onDayChange={this.handleDayChange}
                  selectedDay={dateOfRealisation}
                  value={moment(dateOfAcceptOrOrder)
                    .add(14, "days")
                    .format("YYYY-MM-DD")}
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
                required
              />
              <Form.Input
                value={tapeLong}
                name="tapeLong"
                label="Długość"
                placeholder="Długość"
                width={3}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Input
                value={tapeWidth}
                name="tapeWidth"
                label="Szerokość"
                placeholder="Szerokość"
                width={3}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Input
                value={tapeThickness}
                name="tapeThickness"
                label="Grubość"
                placeholder="Grubość"
                width={3}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Input
                value={tapeColor}
                name="tapeColor"
                label="Kolor taśmy"
                placeholder="Kolor taśmy"
                width={3}
                onChange={this.handleChangeInput}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Field required width={3}>
                <label>Kolory</label>
                <select
                  required
                  onChange={this.handleChangeInput}
                  value={roller}
                  placeholder="Wałek"
                  name="roller"
                >
                  <option value="" disabled>
                    Wałek
                  </option>
                  <option value="144">144</option>
                  <option value="180">180</option>
                  <option value="244">244</option>
                  <option value="306">306</option>
                  <option value="438">438</option>
                </select>
              </Form.Field>
              <Form.Input
                value={glue}
                name="glue"
                label="Klej"
                placeholder="Klej"
                width={2}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Field required width={2}>
                <label>Kolory</label>
                <select
                  required
                  onChange={this.handleChangeInput}
                  value={"" || numberOfColors}
                  placeholder="Kolory"
                  name="numberOfColors"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </Form.Field>
              <Form.Input
                value={color1}
                name="color1"
                label="Kolor 1"
                placeholder="Color 1"
                width={3}
                onChange={this.handleChangeInput}
                required
              />
              <Form.Input
                value={color2}
                name="color2"
                label="Kolor 2"
                placeholder="Color 2"
                width={3}
                onChange={this.handleChangeInput}
              />
              <Form.Input
                value={color3}
                name="color3"
                label="Kolor 3"
                placeholder="Color 3"
                width={3}
                onChange={this.handleChangeInput}
              />
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
                step="0.01"
                width={4}
                onChange={this.handleChangeInput}
                required
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
                required
              />
              <Form.Field required width={4}>
                <label>Marża</label>
                <select
                  required
                  onChange={this.handleChangeInput}
                  value={margin}
                  placeholder="Marża"
                  name="margin"
                >
                  <option value="" disabled>
                    Marża
                  </option>
                  <option value="0">0</option>
                  <option value="0.25">0.25</option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </Form.Field>
              <Form.Field required width={4}>
                <label>Transport</label>
                <select
                  required
                  onChange={this.handleChangeInput}
                  value={transport}
                  placeholder="Transport"
                  name="transport"
                >
                  <option value="" disabled>
                    Transport
                  </option>
                  <option value="Goodmark">Goodmark</option>
                  <option value="Odbiór własny">Odbiór własny</option>
                  <option value="Paczka">Paczka</option>
                  <option value="Półpaleta">Półpaleta</option>
                  <option value="Paleta euro">Paleta euro</option>
                  <option value="Paleta max">Paleta max</option>
                </select>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input
                value={details}
                name="details"
                label="Uwagi"
                placeholder="Uwagi"
                width={8}
                onChange={this.handleChangeInput}
              />
              <Form.Input
                value={deliveryAddress}
                name="deliveryAddress"
                label="Adres dostawy"
                placeholder="Adres dostawy"
                width={8}
                onChange={this.handleChangeInput}
              />
            </Form.Group>
          </Segment>
          <Segment textAlign="center">
            <Button type="submit">Potwierdź</Button>
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
    trader: state.orders.trader,
    deliveryAddress: state.orders.deliveryAddress,
    pickedOrder: pickedOrder(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: (name, value) => dispatch(changeInput(name, value)),
    changeDate: (_date, value) => dispatch(changeDate(_date, value)),
    clearInput: () => dispatch(clearInput()),
    unactivateDetails: () => dispatch(unactivateDetails())
  };
};

const reduxWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

const graphqlOrder = graphql(addOrderMutation, { name: "addOrderMutation" });
const graphqlTape = graphql(addTapeMutation, { name: "addTapeMutation" });
const graphqlDocument = graphql(addDocumentMutation, {
  name: "addDocumentMutation"
});
const graphqlClient = graphql(addClientMutation, {
  name: "addClientMutation"
});
const graphqlUser = graphql(addUserMutation, {
  name: "addUserMutation"
});

const graphqlClientCheck = graphql(isClientInDatabase, {
  options: props => {
    return {
      variables: {
        companyId: props.pickedOrder.companyId
      }
    };
  }
});

export default compose(
  reduxWrapper,
  graphqlOrder,
  graphqlDocument,
  graphqlClient,
  graphqlUser,
  graphqlTape,
  graphqlClientCheck
)(FormOrderTPD);
