import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { graphql } from "react-apollo";

import { fetchData, getDataLoading, activateDetails } from "../../ducks/data";
import { changePaginationMainView } from "../../ducks/interfaceMenu";
import getOrdersItemid from "../../graphql/queries/getOrdersItemid";

import { Button } from "semantic-ui-react";
import "./MainView.css";

import DetailsView from "../DetailsView/DetailsView";

class MainView extends Component {
  componentDidMount() {
    this.props.changePagination(0);
    this.props.fetchData();
  }

  handlePaginationChange = (event, { page }) => {
    this.props.changePagination(page - 1);
  };

  handleClick = (event, data) => {
    const { activateDetails } = this.props;
    const { id, name, kind } = data;
    activateDetails(id, name, kind);
  };

  render() {
    const ordersAlreadyInDB = this.props.data.loading
      ? []
      : this.props.data.orders.map(order => order.itemId);
    const { pagination } = this.props;
    const newOrders = this.props.datas;
    const filteredOrders = newOrders.filter(order => {
      return !ordersAlreadyInDB.includes(order.itemId);
    });
    return (
      <div className="mainview__container">
        <DetailsView />
        {!this.props.isLoadingData && !this.props.data.loading && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell variant="head">Data zamówienia</TableCell>
                <TableCell variant="head">Klient</TableCell>
                <TableCell variant="head">Nr</TableCell>
                <TableCell variant="head">Kod</TableCell>
                <TableCell variant="head">Ilość</TableCell>
                <TableCell variant="head">Cena</TableCell>
                <TableCell variant="head">Wartość</TableCell>
                <TableCell variant="head">Opcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .map(order => (
                  <TableRow key={order.itemId}>
                    <TableCell variant="body">
                      {moment(order.dateInsert).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell variant="body">{order.client}</TableCell>
                    <TableCell variant="body">{order.signature}</TableCell>
                    <TableCell variant="body">{order.code}</TableCell>
                    <TableCell variant="body">
                      {order.quantity} {order.unit}
                    </TableCell>
                    <TableCell variant="body">
                      {order.price} {order.currency}
                    </TableCell>
                    <TableCell variant="body">
                      {order.netValue} {order.currency}
                    </TableCell>
                    <TableCell variant="body">
                      <Button
                        id={order.itemId}
                        name={order.type}
                        kind={order.kind}
                        onClick={this.handleClick}
                      >
                        Zadysponuj
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                .slice(pagination, pagination + 10)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="center" variant="footer" colSpan="8">
                  {/* <TablePagination
                    page={1}
                    rowsPerPage={10}
                    count={Math.ceil(filteredOrders.length / 10)}
                    onChangePage={this.handlePaginationChange}
                  /> */}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    );
  }
}

MainView.defaultProps = {
  isLoadingData: true
};

const mapStateToProps = state => {
  return {
    datas: state.data.data,
    isLoadingData: getDataLoading(state),
    pagination: state.interfaceMenu.paginationMain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changePagination: value => dispatch(changePaginationMainView(value)),
    activateDetails: (id, name, kind) =>
      dispatch(activateDetails(id, name, kind))
  };
};

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
const graphqlQuery = graphql(getOrdersItemid);

export default compose(reduxWrapper, graphqlQuery)(MainView);
