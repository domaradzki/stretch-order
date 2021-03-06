import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function StretchForm({ input, handleInputChange }) {
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
            onChange={handleInputChange}
            value={input.sleeve}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
            onChange={handleInputChange}
            value={input.stretchColor}
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
            onChange={handleInputChange}
            value={input.stretchThickness}
            type="text"
            InputProps={{
              endAdornment: <InputAdornment position="end">my</InputAdornment>,
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
            onChange={handleInputChange}
            value={input.netWeight}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
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
            onChange={handleInputChange}
            value={input.grossWeight}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
