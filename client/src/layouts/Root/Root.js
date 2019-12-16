import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Dashboard from "../Dashboard/Dashboard";
import MainContainer from "../MainContainer/MainContainer";
import MainView from "../MainView/MainView";
import AcceptedOrderView from "../AcceptedOrderView/AcceptedOrderView";
import TapeProductionView from "../TapeProductionView/TapeProductionView";
import StretchProductionView from "../StretchProductionView/StretchProductionView";
import Checkout from "../Checkout/Checkout";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Dashboard>
            <Route exact path="/" component={MainContainer} />
            <Route exact path="/new" component={MainView} />
            <Route path="/new/:orderId" component={Checkout} />
            <Route path="/orders" component={AcceptedOrderView} />
            <Route path="/tape" component={TapeProductionView} />
            <Route path="/stretch" component={StretchProductionView} />
            <Route path="/transport" component={MainContainer} />
            <Route path="/raports" component={MainContainer} />
            <Route path="/settings" component={MainContainer} />
          </Dashboard>
        </Router>
      </ApolloProvider>
    );
  }
}

export default Root;
