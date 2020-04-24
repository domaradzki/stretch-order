import React, { Component } from 'react';
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
import getOrdersStretchQuery from '../../graphql/queries/getOrdersStretchQuery';

import { styles } from './StretchProductionView.style';
import { withStyles } from '@material-ui/styles';

class StretchProductionView extends Component {
  componentDidMount() {
    this.props.changePage(0);
  }

  handlePageChange = (event, newPage) => {
    this.props.changePage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.props.setRowsPerPage(+event.target.value);
  };

  handleClick = (event) => {
    console.log(event.currentTarget);
  };

  render() {
    const stretchOrders = this.props.data.stretches;
    const { page, rowsPerPage, classes } = this.props;
    return (
      <Paper>
        {!this.props.data.loading && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant="head">Klient</TableCell>
                  <TableCell variant="head">Termin</TableCell>
                  <TableCell variant="head">Ilość</TableCell>
                  <TableCell variant="head">Waga netto</TableCell>
                  <TableCell variant="head">Tuleja</TableCell>
                  <TableCell variant="head">Waga brutto</TableCell>
                  <TableCell variant="head">Kolor</TableCell>
                  <TableCell variant="head">Grubość</TableCell>
                  <TableCell variant="head">Opcje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stretchOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((stretch) => (
                    <TableRow key={stretch.id}>
                      <TableCell variant="body">
                        {stretch.order.document.client.name}
                      </TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {stretch.order.document.dateOfRealisation &&
                          format(
                            new Date(stretch.order.document.dateOfRealisation),
                            'dd/MM/yyyy'
                          )}
                      </TableCell>
                      <TableCell variant="body">
                        {stretch.order.quantity} {stretch.order.unit}
                      </TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {stretch.netWeight}
                      </TableCell>
                      <TableCell variant="body">{stretch.sleeve}</TableCell>
                      <TableCell variant="body" className={classes.tableCell}>
                        {stretch.grossWeight}
                      </TableCell>
                      <TableCell variant="body">
                        {stretch.stretchColor}
                      </TableCell>
                      <TableCell variant="body">
                        {stretch.stretchThickness}
                      </TableCell>
                      <TableCell variant="body">
                        <Button
                          onClick={this.handleClick}
                          variant="contained"
                          color="primary"
                        >
                          Pokaż
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
              count={stretchOrders.length}
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
const graphqlQuery = graphql(getOrdersStretchQuery);
const stylesComponent = withStyles(styles);

export default compose(
  stylesComponent,
  reduxWrapper,
  graphqlQuery
)(StretchProductionView);
