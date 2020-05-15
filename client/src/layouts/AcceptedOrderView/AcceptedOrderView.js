import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import format from 'date-fns/format';

import { changePage, setRowsPerPage } from '../../ducks/interfaceMenu';
import getOrdersQuery from '../../graphql/queries/getOrdersQuery';

import { styles } from './AcceptedOrderView.style';
import { withStyles } from '@material-ui/styles';

function AcceptedOrderView(props) {
  useEffect(() => {
    props.changePage(0);
  }, []);

  const handlePageChange = (event, newPage) => {
    props.changePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
  };

  const userOrders = props.data.orders;
  const { page, rowsPerPage, classes } = props;
  return (
    <Paper>
      {!props.data.loading && (
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
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell variant="body" className={classes.tableCell}>
                      {format(
                        new Date(order.document.dateInsert),
                        'dd/MM/yyyy'
                      )}
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
                      {format(
                        new Date(order.document.dateOfRealisation),
                        'dd/MM/yyyy'
                      )}
                    </TableCell>
                    <TableCell variant="body" className={classes.tableCell}>
                      {order.document.dateOfPay &&
                        format(
                          new Date(order.document.dateOfPay),
                          'dd/MM/yyyy'
                        )}
                    </TableCell>
                    <TableCell variant="body">
                      {order.document.invoice}
                    </TableCell>
                    <TableCell variant="body">{'status'}</TableCell>
                    <TableCell variant="body">
                      <Link to={`/orders/${order.id}`}>
                        <Button variant="contained" color="primary">
                          Zadysponuj
                        </Button>
                      </Link>
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
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    page: state.interfaceMenu.page,
    rowsPerPage: state.interfaceMenu.rowsPerPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (value) => dispatch(changePage(value)),
    setRowsPerPage: (value) => dispatch(setRowsPerPage(value)),
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
