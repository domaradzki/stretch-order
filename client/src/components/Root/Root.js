import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Dashboard from "../Dashboard/Dashboard";
import MainMenu from "../MainMenu/MainMenu";
import "./Root.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="router__container">
            <MainMenu />
            <Route component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default Root;
