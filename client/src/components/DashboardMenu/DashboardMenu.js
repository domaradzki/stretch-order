import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";

import { connect } from "react-redux";

import { changeMenu } from "../../ducks/interfaceMenu";

class DashboardMenu extends Component {
  handleItemClick = (e, { name }) => this.props.changeMenu(name);

  render() {
    const activeItem = this.props.activeItem;
    return (
      <Menu color="grey" inverted attached="top" tabular>
        <Menu.Item
          name="oczekujące"
          active={activeItem === "oczekujące"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="zlecone"
          active={activeItem === "zlecone"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Produkcja Nadruk"
          active={activeItem === "Produkcja Nadruk"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              transparent
              icon={{ name: "search", link: true }}
              placeholder="Szukaj..."
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeItem: state.interfaceMenu.activeItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMenu: name => dispatch(changeMenu(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
