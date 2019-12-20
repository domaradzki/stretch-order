import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function StretchForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Parametry folii stretch
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="sleeve"
            name="sleeve"
            label="Tuleja"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="stretchColor"
            name="stretchColor"
            label="Kolor folii"
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="stretchThickness"
            name="stretchThickness"
            label="Grubość folii"
            type="text"
            InputProps={{
              endAdornment: <InputAdornment position="end">my</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="netWeight"
            name="netWeight"
            label="Waga netto"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="grossWeight"
            name="grossWeight"
            label="Waga brutto"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
