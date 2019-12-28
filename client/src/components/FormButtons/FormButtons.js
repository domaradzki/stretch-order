import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const FormButtons = ({
  steps,
  activeStep,
  handleBack,
  handleAddOrder,
  history
}) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {activeStep !== 0 ? (
        <Button onClick={handleBack} className={classes.button}>
          Powrót
        </Button>
      ) : (
        <Button onClick={() => history.goBack()} className={classes.button}>
          Anuluj
        </Button>
      )}
      {activeStep === steps.length - 1 ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddOrder}
        >
          Potwierdź
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Dalej
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
