import React, { Component } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class Login extends Component {
  state = {
    user: "",
    password: ""
  };
  handleInputChange= event => {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    this.setState({
      [id]: value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.user)
  }

  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment color="blue" stacked>
                <Form.Input
                  fluid
                  id="user"
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.user}
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  id="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Button color="blue" fluid size="large" onClick={this.handleSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Login;
