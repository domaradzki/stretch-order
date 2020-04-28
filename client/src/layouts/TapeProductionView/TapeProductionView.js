import React, { useEffect } from 'react';
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

import { styles } from './TapeProductionView.style';
import { withStyles } from '@material-ui/styles';

import { changePage, setRowsPerPage } from '../../ducks/interfaceMenu';
import getOrdersTapeQuery from '../../graphql/queries/getOrdersTapeQuery';

function TapeProductionView(props) {
  useEffect(() => {
    props.changePage(0);
  }, []);

  const handlePageChange = (event, newPage) => {
    props.changePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
  };

  const handleClick = (event) => {
    console.log(event.currentTarget);
  };

  const tapeOrders = props.data.tapes;
  const { page, rowsPerPage, classes } = props;
  return (
    <Paper>
      {!props.data.loading && (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Miniatura</TableCell>
                <TableCell variant="head">Nadruk</TableCell>
                <TableCell variant="head">Wałek</TableCell>
                <TableCell variant="head">Segregator</TableCell>
                <TableCell variant="head">Projekt</TableCell>
                <TableCell variant="head">Termin</TableCell>
                <TableCell variant="head">Ilość</TableCell>
                <TableCell variant="head">Długość</TableCell>
                <TableCell variant="head">Szerokość</TableCell>
                <TableCell variant="head">Klej</TableCell>
                <TableCell variant="head">Taśma</TableCell>
                <TableCell variant="head">Reszta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tapeOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tape) => (
                  <TableRow key={tape.id}>
                    <TableCell variant="body">{'img'}</TableCell>
                    <TableCell variant="body">{tape.printName}</TableCell>
                    <TableCell variant="body">{tape.roller} mm</TableCell>
                    <TableCell variant="body">{'seg'}</TableCell>
                    <TableCell variant="body">{'projectNR'}</TableCell>
                    <TableCell variant="body" className={classes.tableCell}>
                      {tape.order.document.dateOfRealisation &&
                        format(
                          new Date(tape.order.document.dateOfRealisation),
                          'dd/MM/yyyy'
                        )}
                    </TableCell>
                    <TableCell variant="body" className={classes.tableCell}>
                      {tape.order.quantity} {tape.order.unit}
                    </TableCell>
                    <TableCell variant="body">{tape.tapeLong} mm</TableCell>
                    <TableCell variant="body">{tape.tapeWidth} mm</TableCell>
                    <TableCell variant="body">{tape.glue}</TableCell>
                    <TableCell variant="body">{tape.tapeColor}</TableCell>
                    <TableCell variant="body">
                      <Button
                        onClick={handleClick}
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
            count={tapeOrders.length}
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
const graphqlQuery = graphql(getOrdersTapeQuery);
const stylesComponent = withStyles(styles);

export default compose(
  stylesComponent,
  reduxWrapper,
  graphqlQuery
)(TapeProductionView);
