import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  }
}));

export default function TapeForm() {
  const classes = useStyles();

  const initialValues = {
    printName: "",
    tapeLong: "",
    tapeWidth: "",
    tapeThickness: "",
    tapeColor: "",
    numberOfColors: "",
    glue: "",
    roller: "",
    color1: "",
    color2: "",
    color3: ""
  };

  const [dateOfAcceptation, setDateOfAcceptation] = React.useState(null);
  const handleDateOfAcceptationChange = date => {
    setDateOfAcceptation(date);
  };
  const [input, setInput] = React.useState(initialValues);
  const handleInputChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfAcceptation"
              name="dateOfAcceptation"
              helperText="Data akceptacji"
              value={dateOfAcceptation}
              type="text"
              onChange={handleDateOfAcceptationChange}
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
            InputProps={{
              endAdornment: <InputAdornment position="end">my</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth required className={classes.formControl}>
            <InputLabel id="rollerLabel">Wałek</InputLabel>
            <Select
              labelId="rollerLabel"
              id="roller"
              name="roller"
              value={input.roller}
              type="number"
              onChange={handleInputChange}
              className={classes.selectEmpty}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={144}>144</MenuItem>
              <MenuItem value={180}>180</MenuItem>
              <MenuItem value={244}>244</MenuItem>
              <MenuItem value={306}>306</MenuItem>
              <MenuItem value={438}>438</MenuItem>
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
            type="text"
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
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="color2"
            name="color2"
            label="Kolor 2"
            onChange={handleInputChange}
            value={input.color2}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="color3"
            name="color3"
            label="Kolor 3"
            onChange={handleInputChange}
            value={input.color3}
            type="text"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
