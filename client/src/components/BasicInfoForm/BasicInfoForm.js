import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export default function BasicInfoForm({
  input,
  handleInputChange,
  handleDateChange,
}) {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Informacje podstawowe
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="client"
              name="client"
              label="Klient"
              onChange={handleInputChange}
              value={input.client}
              type="text"
              fullWidth
              autoComplete="client"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <KeyboardDatePicker
              required
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateInsert"
              name="dateInsert"
              helperText="Data zamówienia"
              value={input.dateInsert}
              type="text"
              onChange={handleDateChange('dateInsert')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <KeyboardDatePicker
              required
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfRealisation"
              name="dateOfRealisation"
              helperText="Data realizacji"
              value={input.dateOfRealisation}
              type="text"
              onChange={handleDateChange('dateOfRealisation')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="deliveryAddress"
              name="deliveryAddress"
              label="Adres dostawy"
              onChange={handleInputChange}
              value={input.deliveryAddress}
              type="text"
              fullWidth
              autoComplete="delivery address"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <KeyboardDatePicker
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfPay"
              name="dateOfPay"
              helperText="Data płatności"
              value={input.dateOfPay}
              type="text"
              onChange={handleDateChange('dateOfPay')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="quantity"
              name="quantity"
              label="Ilość"
              onChange={handleInputChange}
              value={input.quantity}
              type="number"
              fullWidth
              autoComplete="quantity"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{input.unit}</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="price"
              name="price"
              label="Cena"
              onChange={handleInputChange}
              value={input.price}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="price"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="netValue"
              name="netValue"
              label="Wartość"
              onChange={handleInputChange}
              value={input.netValue}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="net value"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="paymentMethodLabel">Sposób płatności</InputLabel>
              <Select
                native
                labelId="paymentMethodLabel"
                id="paymentMethod"
                name="paymentMethod"
                value={input.paymentMethod}
                type="text"
                onChange={handleInputChange}
                className={classes.selectEmpty}
              >
                <option />
                <option value="Termin">Termin</option>
                <option value="Pobranie">Pobranie</option>
                <option value="Gotówka">Gotówka</option>
                <option value="Proforma">Proforma</option>
                <option value="Proforma zapłacona">Proforma zapłacona</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="marginLabel">Marża</InputLabel>
              <Select
                native
                labelId="marginLabel"
                id="margin"
                name="margin"
                value={input.margin}
                type="number"
                onChange={handleInputChange}
                className={classes.selectEmpty}
              >
                <option />

                <option value={0}>0</option>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="transportLabel">Transport</InputLabel>
              <Select
                native
                labelId="transportLabel"
                id="transport"
                name="transport"
                value={input.transport}
                type="text"
                onChange={handleInputChange}
                className={classes.selectEmpty}
              >
                <option />
                <option value="Goodmark">Goodmark</option>
                <option value="Odbiór własny">Odbiór własny</option>
                <option value="Paczka">Paczka</option>
                <option value="Półpaleta">Półpaleta</option>
                <option value="Paleta euro">Paleta euro</option>
                <option value="Paleta max">Paleta max</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="details"
              name="details"
              label="Uwagi"
              onChange={handleInputChange}
              value={input.details}
              type="text"
              fullWidth
              autoComplete="details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
}
