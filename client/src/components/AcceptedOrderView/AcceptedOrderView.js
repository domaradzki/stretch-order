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

import { changePage, setRowsPerPage } from "../../ducks/interfaceMenu";
import getOrdersQuery from "../../graphql/queries/getOrdersQuery";

import DetailsView from "../DetailsView/DetailsView";

import { styles } from "./AcceptedOrderView.style";
import { withStyles } from "@material-ui/styles";

class AcceptedOrderView extends Component {
  componentDidMount() {
    this.props.changePage(0);
  }

  handlePageChange = (event, newPage) => {
    this.props.changePage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.props.setRowsPerPage(+event.target.value);
  };

  handleClick = event => {
    console.log(event.currentTarget);
  };

  render() {
    const userOrders = this.props.data.orders;
    const { page, rowsPerPage, classes } = this.props;
    return (
      <Paper>
        <DetailsView />
        {!this.props.data.loading && (
          <>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell variant="head">Data zamówienia</TableCell>
                  <TableCell variant="head">Klient</TableCell>
                  <TableCell variant="head">Zamówienie</TableCell>
                  <TableCell variant="head">Kod</TableCell>
                  <TableCell variant="head">Wartość</TableCell>
                  <TableCell variant="head">Data realizacji</TableCell>
                  <TableCell variant="head">Data wpłaty</TableCell>
                  <TableCell variant="head">Faktura</TableCell>
                  <TableCell variant="head">Status</TableCell>
                  <TableCell variant="head">Szczegóły</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(order => (
                    <TableRow key={order.id}>
                      <TableCell variant="body" className={classes.tableCell}>
                        {moment(order.document.dateInsert).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell variant="body">
                        {order.document.client.name}
                      </TableCell>
                      <TableCell variant="body">
                        {order.document.signature}
                      </TableCell>
                      <TableCell variant="body">{order.code}</TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {order.netValue} {order.document.currency}
                      </TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {order.document.dateOfRealisation}
                      </TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {order.document.dateOfPay}
                      </TableCell>
                      <TableCell variant="body">
                        {order.document.invoice}
                      </TableCell>
                      <TableCell variant="body">{"status"}</TableCell>
                      <TableCell variant="body">
                        <Button
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              labelRowsPerPage="Pozycji na stronie"
              component="div"
              count={userOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.interfaceMenu.page,
    rowsPerPage: state.interfaceMenu.rowsPerPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: value => dispatch(changePage(value)),
    setRowsPerPage: value => dispatch(setRowsPerPage(value))
  };
};

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
const graphqlQuery = graphql(getOrdersQuery);
const stylesComponent = withStyles(styles);

export default compose(
  stylesComponent,
  reduxWrapper,
  graphqlQuery
)(AcceptedOrderView);
