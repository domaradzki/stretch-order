import React, { Component } from "react";

import { connect } from "react-redux";
import { Segment, Form } from "semantic-ui-react";

import "./DetailsView.css";
import { unactivateDetails } from "../../ducks/interfaceMenu";

class DetailsView extends Component {
  render() {
      const { order, data, active } = this.props;
      const orderDetails = data.filter((item)=>item.itemId=order);
      const {dateInsert, client,signature,code,quantity,price,netValue,details} = orderDetails;
      console.log(order)
    return (
      <div className={active ? "details__container" : "details__container--hidden"}>
        {active ? (
          <Segment color="blue">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="dateInsert"
                  label="Data zamówienia"
                  placeholder="Data zamówienia"
                  value={dateInsert}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="client"
                  label="Nazwa"
                  placeholder="Nazwa"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="signature"
                  label="Symbol"
                  placeholder="Symbol"
                  value={signature}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="code"
                  label="Code"
                  placeholder="Code"
                  value={code}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="quantity"
                  label="Ilość"
                  placeholder="Ilość"
                  value={quantity}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="price"
                  label="Cena"
                  placeholder="Cena"
                  value={price}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="netValue"
                  label="Wartość netto"
                  placeholder="Wartość netto"
                  value={netValue}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="details"
                  label="Uwagi"
                  placeholder="Uwagi"
                  value={details}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Segment>
        ) : (
          <Segment color="blue">
            <Form>
              <Form.Group widths="equal">
                <div className="field">
                  <label>Data zamówienia</label>
                  <div className="formBox">{dateInsert}</div>
                </div>

                <div className="field">
                  <label>Nazwa firmy</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Sygnatura</label>
                  <div className="formBox">{signature}</div>
                </div>
                <div className="field">
                  <label>Code</label>
                  <div className="formBox">{code}</div>
                </div>
              </Form.Group>
              <Form.Group widths="equal">
                <div className="field">
                  <label>Ilość</label>
                  <div className="formBox">{quantity}</div>
                </div>
                <div className="field">
                  <label>Cena</label>
                  <div className="formBox">{price}</div>
                </div>
                <div className="field">
                  <label>Wartość netto</label>
                  <div className="formBox">{netValue}</div>
                </div>
                <div className="field">
                  <label>Uwagi</label>
                  <div className="formBox">{details}</div>
                </div>
              </Form.Group>
            </Form>
          </Segment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.interfaceMenu.activeOrder,
    active: state.interfaceMenu.activeDetails,
    data: state.data.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unactivateDetails: () => dispatch(unactivateDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsView);
