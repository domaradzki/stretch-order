import React, { Component } from "react";

import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";

import "./DetailsView.css";
import { unactivateDetails } from "../../ducks/interfaceMenu";

class DetailsView extends Component {
  render() {
      const { order, data, active } = this.props;
      const orderDetails = data.filter((item)=>item.itemId=order);
      const {dateInsert, client,signature,code,quantity,price,netValue,details} =orderDetails;
      console.log(orderDetails)
    return (
      <div className={active ? "details__container" : "details__container--hidden"}>
        {active ? (
          <Segment color="blue">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="company_name"
                  label="Company name"
                  placeholder="Company name"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="name"
                  label="First name"
                  placeholder="First name"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="surname"
                  label="Last name"
                  placeholder="Last name"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="nip"
                  label="NIP"
                  placeholder="NIP"
                  value={client}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="city"
                  label="City"
                  placeholder="City"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="postalcode"
                  label="Postal Code"
                  placeholder="Postal Code"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="street"
                  label="Street"
                  placeholder="Street"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="number"
                  label="Number"
                  placeholder="Number"
                  value={client}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="phone"
                  label="Phone"
                  placeholder="Phone"
                  value={client}
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
                  <label>Company name</label>
                  <div className="formBox">{client}</div>
                </div>

                <div className="field">
                  <label>First name</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Last name</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>NIP</label>
                  <div className="formBox">{client}</div>
                </div>
              </Form.Group>
              <Form.Group widths="equal">
                <div className="field">
                  <label>City</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Postal Code</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Street</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Number</label>
                  <div className="formBox">{client}</div>
                </div>
                <div className="field">
                  <label>Phone</label>
                  <div className="formBox">{client} </div>
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
