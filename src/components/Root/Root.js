import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from '../Dashboard'
import MainMenu from "../MainMenu/MainMenu";
//import Login from '../Login'
import './Root.css';

class Root extends Component {
  render() {
    return (
      <Router>
         <div className="router__container">
        <MainMenu />
        <Route component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>

    );
  }
}

export default Root;
