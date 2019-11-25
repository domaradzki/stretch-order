import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { changeView } from "../../ducks/interfaceMenu";

const NavItem = ({ to, children, exact, name, active, onClick }) => (
  <Menu.Item
    to={to}
    as={NavLink}
    exact={exact}
    name={name}
    active={active}
    onClick={onClick}
  >
    {children}
  </Menu.Item>
);

class MainMenu extends Component {
  handleItemClick = (e, { name }) => this.props.changeView(name);

  render() {
    const activeView = this.props.activeView;
    return (
      <Menu color="grey" inverted>
        <Menu.Item></Menu.Item>
        <NavItem
          exact
          to="/"
          as={NavLink}
          name="dashboard"
          active={activeView === "dashboard"}
          onClick={this.handleItemClick}
        >
          Dashboard
        </NavItem>

        <NavItem
          exact
          to="/konto"
          as={NavLink}
          name="konto"
          active={activeView === "konto"}
          onClick={this.handleItemClick}
        >
          Moje konto
        </NavItem>

        <Menu.Menu position="right">
          <NavItem
            exact
            to="/login"
            as={NavLink}
            name="login"
            active={activeView === "login"}
            onClick={this.handleItemClick}
          >
            Zaloguj
          </NavItem>

          <NavItem
            exact
            to="/help"
            as={NavLink}
            name="pomoc"
            active={activeView === "pomoc"}
            onClick={this.handleItemClick}
          >
            Pomoc
          </NavItem>
        </Menu.Menu>
      </Menu>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeView: state.interfaceMenu.activeView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: name => dispatch(changeView(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
