import "date-fns";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  }
}));

export default function BasicInfoForm({ activeOrder }) {
  const classes = useStyles();

  const initialValues = {
    client: "",
    quantity: "",
    price: "",
    netValue: "",
    details: "",
    deliveryAddress: "",
    transport: "",
    margin: ""
  };

  const [dateInsert, setInsertDate] = React.useState(new Date());
  const handleInsertDateChange = date => {
    setInsertDate(date);
  };
  const [dateOfRealisation, setDateOfRealisation] = React.useState(new Date());
  const handleDateOfRealisationChange = date => {
    setDateOfRealisation(date);
  };
  const [dateOfPay, setDateOfPay] = React.useState(null);
  const handleDateOfPayChange = date => {
    setDateOfPay(date);
  };
  const [input, setInput] = React.useState(initialValues);
  const handleInputChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };
  useEffect(() => {
    const {
      client,
      quantity,
      price,
      netValue,
      details,
      deliveryAddress
    } = activeOrder;
    setInput({
      ...input,
      client,
      quantity,
      price,
      netValue,
      details,
      deliveryAddress
    });
  });
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
              value={dateInsert}
              type="text"
              onChange={handleInsertDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
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
              value={dateOfRealisation}
              type="text"
              onChange={handleDateOfRealisationChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
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
              value={dateOfPay}
              type="text"
              onChange={handleDateOfPayChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="price"
              name="price"
              label="Cena"
              onChange={handleInputChange}
              value={input.price}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">zł</InputAdornment>
              }}
              fullWidth
              autoComplete="price"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="netValue"
              name="netValue"
              label="Wartość"
              onChange={handleInputChange}
              value={input.netValue}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">zł</InputAdornment>
              }}
              fullWidth
              autoComplete="net value"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="marginLabel">Marża</InputLabel>
              <Select
                labelId="marginLabel"
                id="margin"
                name="margin"
                value={input.margin}
                type="number"
                onChange={handleInputChange}
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={0.25}>0.25</MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="transportLabel">Transport</InputLabel>
              <Select
                labelId="transportLabel"
                id="transport"
                name="transport"
                value={input.transport}
                type="text"
                onChange={handleInputChange}
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Goodmark">Goodmark</MenuItem>
                <MenuItem value="Odbiór własny">Odbiór własny</MenuItem>
                <MenuItem value="Paczka">Paczka</MenuItem>
                <MenuItem value="Półpaleta">Półpaleta</MenuItem>
                <MenuItem value="Paleta euro">Paleta euro</MenuItem>
                <MenuItem value="Paleta max">Paleta max</MenuItem>
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
