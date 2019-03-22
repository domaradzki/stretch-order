import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from '../Dashboard'
import Login from '../Login'

class Root extends Component {
  render() {
    return (
      <div>
        <Login />
      <Router>
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
      </div>
    );
  }
}

export default Root;
