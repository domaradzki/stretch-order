import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from '../Dashboard'

class Root extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    );
  }
}

export default Root;
