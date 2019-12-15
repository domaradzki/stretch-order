import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Dashboard from "../Dashboard/Dashboard";
import MainContainer from "../MainContainer/MainContainer";
import MainView from "../../components/MainView/MainView";
import AcceptedOrderView from "../../components/AcceptedOrderView/AcceptedOrderView";
import TapeProductionView from "../../components/TapeProductionView/TapeProductionView";
import StretchProductionView from "../../components/StretchProductionView/StretchProductionView";

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
            <Route path="/new" component={MainView} />
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
