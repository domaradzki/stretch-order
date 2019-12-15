import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { graphql } from "react-apollo";

import { fetchData, getDataLoading, activateDetails } from "../../ducks/data";
import { changePage, setRowsPerPage } from "../../ducks/interfaceMenu";
import getOrdersItemid from "../../graphql/queries/getOrdersItemid";

import "./MainView.css";

import DetailsView from "../DetailsView/DetailsView";

class MainView extends Component {
  componentDidMount() {
    this.props.changePage(0);
    this.props.fetchData();
  }

  handlePageChange = (event, newPage) => {
    this.props.changePage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.props.setRowsPerPage(+event.target.value);
  };

  handleClick = event => {
    const { activateDetails } = this.props;
    const { id, name, kind } = event.currentTarget;
    activateDetails(id, name, kind);
  };

  render() {
    const ordersAlreadyInDB = this.props.data.loading
      ? []
      : this.props.data.orders.map(order => order.itemId);
    const { page, rowsPerPage } = this.props;
    const newOrders = this.props.datas;
    const filteredOrders = newOrders.filter(order => {
      return !ordersAlreadyInDB.includes(order.itemId);
    });
    return (
      <Paper>
        <DetailsView />
        {!this.props.isLoadingData && !this.props.data.loading && (
          <Table stickyHeader aria-label="sticky table">
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        variant="contained"
                        color="primary"
                      >
                        Zadysponuj
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          labelRowsPerPage="Pozycji na stronie"
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
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
    page: state.interfaceMenu.page,
    rowsPerPage: state.interfaceMenu.rowsPerPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changePage: value => dispatch(changePage(value)),
    setRowsPerPage: value => dispatch(setRowsPerPage(value)),
    activateDetails: (id, name, kind) =>
      dispatch(activateDetails(id, name, kind))
  };
};

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
const graphqlQuery = graphql(getOrdersItemid);

export default compose(reduxWrapper, graphqlQuery)(MainView);
