import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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
  },
  input: {
    display: "none"
  }
}));

export default function TapeForm({
  input,
  handleInputChange,
  handleDateChange,
  handleChangeFile
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Parametry taśmy z nadrukiem
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="printName"
            name="printName"
            label="Nadruk"
            onChange={handleInputChange}
            value={input.printName}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <KeyboardDatePicker
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfAcceptation"
              name="dateOfAcceptation"
              helperText="Data akceptacji"
              value={input.dateOfAcceptation}
              type="text"
              onChange={handleDateChange("dateOfAcceptation")}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="tapeLong"
            name="tapeLong"
            label="Długość"
            onChange={handleInputChange}
            value={input.tapeLong}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="tapeWidth"
            name="tapeWidth"
            label="Szerokość"
            onChange={handleInputChange}
            value={input.tapeWidth}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="tapeThickness"
            name="tapeThickness"
            label="Grubość"
            onChange={handleInputChange}
            value={input.tapeThickness}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">my</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="tapeColor"
            name="tapeColor"
            label="Kolor taśmy"
            onChange={handleInputChange}
            value={input.tapeColor}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth required className={classes.formControl}>
            <InputLabel id="rollerLabel">Wałek</InputLabel>
            <Select
              native
              labelId="rollerLabel"
              id="roller"
              name="roller"
              value={input.roller}
              type="number"
              onChange={handleInputChange}
              className={classes.selectEmpty}
            >
              <option />
              <option value={144}>144</option>
              <option value={180}>180</option>
              <option value={244}>244</option>
              <option value={306}>306</option>
              <option value={438}>438</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="glue"
            name="glue"
            label="Klej"
            onChange={handleInputChange}
            value={input.glue}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="numberOfColors"
            name="numberOfColors"
            label="Ilość kolorów"
            onChange={handleInputChange}
            value={input.numberOfColors}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="color1"
            name="color1"
            label="Kolor 1"
            onChange={handleInputChange}
            value={input.color1}
            type="text"
            fullWidth
          />
        </Grid>
        {+input.numberOfColors >= 2 && (
          <Grid item xs={12} md={3}>
            <TextField
              id="color2"
              name="color2"
              label="Kolor 2"
              onChange={handleInputChange}
              value={input.color2}
              type="text"
              fullWidth
            />
          </Grid>
        )}
        {+input.numberOfColors === 3 && (
          <Grid item xs={12} md={3}>
            <TextField
              id="color3"
              name="color3"
              label="Kolor 3"
              onChange={handleInputChange}
              value={input.color3}
              type="text"
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <input
            accept="image/*"
            className={classes.input}
            id="fileX"
            name="imageFile"
            multiple
            type="file"
            onChange={handleChangeFile}
          />
          <label htmlFor="fileX">
            <Button variant="contained" color="primary" component="span">
              Wgraj plik
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={input.file}
            width="100%"
            alt={input.file ? "Projekt" : ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
