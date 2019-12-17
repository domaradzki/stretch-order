import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function BasicInfoForm() {
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              onChange={handleDateOfRealisationChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="deliveryAddress"
              name="deliveryAddress"
              label="Adres dostawy"
              fullWidth
              autoComplete="delivery address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfPay"
              name="dateOfPay"
              helperText="Data płatności"
              value={dateOfPay}
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
              fullWidth
              autoComplete="net value"
            />
          </Grid>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
        </Grid>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
}
