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
import isInDatabase from "../../graphql/queries/isInDatabase";

class FormOrderPacking extends Component {
  async componentDidMount() {
    const { pickedOrder } = this.props;
    pickedOrder.dateOfRealisation = moment(pickedOrder.dateInsert)
      .add(1, "days")
      .format("YYYY-MM-DD");

    for (let key in pickedOrder) {
      if (pickedOrder.hasOwnProperty(key)) {
        this.props.changeInput(key, pickedOrder[key]);
      }
    }
    await this.props.data.refetch();
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
    this.props.clearInput();
    this.props.unactivateDetails();
  };

  handleAddOrder = event => {
    event.preventDefault();
    console.log("in");
    const {
      client,
      quantity,
      price,
      netValue,
      details,
      dateInsert,
      invoice,
      dateOfPay,
      dateOfRealisation,
      deliveryAddress,
      trader,
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
      console.log("add");
      const isClient = this.props.data.client;
      const isUser = this.props.data.user;
      const isDocument = this.props.data.document;

      const addingClient = () =>
        this.props
          .addClientMutation({
            variables: {
              name: client,
              companyId
            }
          })
          .then(res => res.data.addClient.id);

      const addingUser = () =>
        this.props
          .addUserMutation({
            variables: {
              name: trader
            }
          })
          .then(res => res.data.addUser.id);

      const addingOrder = async (idDoc, idProduct) =>
        await this.props.addOrderMutation({
          variables: {
            itemId,
            name: assortment,
            code,
            kind,
            type,
            quantity,
            price,
            netValue,
            documentId: idDoc,
            productId: idProduct
          }
        });

      const addingDocument = (idC, idU) =>
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
              clientId: idC,
              userId: idU
            }
          })
          .then(res => res.data.addDocument.id);

      const promiseIfNoClient = async () =>
        isClient ? isClient.id : await addingClient();

      const promiseIfNoUser = async () =>
        isUser ? isUser.id : await addingUser();

      const promiseIfNoDocument = async (idC, idU) =>
        isDocument ? isDocument.id : await addingDocument(idC, idU);

      Promise.all([promiseIfNoClient(), promiseIfNoUser()])
        .then(result => {
          return {
            clientId: result[0],
            userId: result[1]
          };
        })
        .then(res => {
          promiseIfNoDocument(res.clientId, res.userId).then(r => {
            addingOrder(r, "123"); //temporary string 123, product in null
          });
        });
      this.props.unactivateDetails();
      this.props.clearInput();
      console.log("out");
    }
  };
  render() {
    const {
      client,
      quantity,
      price,
      netValue,
      details,
      dateInsert,
      deliveryAddress,
      dateOfPay,
      dateOfRealisation,
      margin,
      transport
    } = this.props;
    return (
      <Segment color="blue">
        <h3>Zlecenie pakowania i wysyłki towaru z magazynu</h3>
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
                  selectedDay={moment(dateOfRealisation).format("YYYY-MM-DD")}
                  value={moment(dateOfRealisation)
                    .add(2, "days")
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
            </Form.Group>
          </Segment>
          <Segment color="blue">
            <Form.Group>
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
              <Form.Input
                value={deliveryAddress}
                name="deliveryAddress"
                label="Adres dostawy"
                placeholder="Adres dostawy"
                width={12}
                onChange={this.handleChangeInput}
              />
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
    dateOfRealisation: state.orders.dateOfRealisation,
    deliveryAddress: state.orders.deliveryAddress,
    trader: state.orders.trader,
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
const graphqlDocument = graphql(addDocumentMutation, {
  name: "addDocumentMutation"
});
const graphqlClient = graphql(addClientMutation, {
  name: "addClientMutation"
});
const graphqlUser = graphql(addUserMutation, {
  name: "addUserMutation"
});

const graphqlCheck = graphql(isInDatabase, {
  options: props => {
    return {
      variables: {
        documentId: props.pickedOrder.documentId,
        companyId: props.pickedOrder.companyId,
        name: props.trader
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
  graphqlCheck
)(FormOrderPacking);
