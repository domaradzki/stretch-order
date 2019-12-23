import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BasicInfoForm from "../../components/BasicInfoForm/BasicInfoForm";
import StretchForm from "../../components/StretchForm/StretchForm";
import Review from "../../components/Review/Review";
import TapeForm from "../../components/TapeForm/TapeForm";
import TransportForm from "../../components/TransportForm/TransportForm";

import { activeOrder } from "../../ducks/data";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Informacje ogólne", "Parametry produktu", "Weryfikacja"];

function getStepContent(step, activeOrder, type, kind) {
  switch (step) {
    case 0:
      return <BasicInfoForm activeOrder={activeOrder} />;
    case 1:
      return type === "TPD" && kind === "KT" ? (
        <TapeForm activeOrder={activeOrder} />
      ) : type === "FS" && kind === "KT" ? (
        <StretchForm activeOrder={activeOrder} />
      ) : (
        <TransportForm activeOrder={activeOrder} />
      );
    case 2:
      return <Review activeOrder={activeOrder} />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = event => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    // const { orderId } = props.match.params;
    console.log(props.activeOrder);
  });

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Sukces!!!
              </Typography>
              <Typography variant="subtitle1">
                Twoje zamówienie zostało poprawnie dodane. Możesz je
                monitorować, lub edytować w zakładce zlecone, gdzie znajdziesz
                wszystkie swoje zamówienia.
              </Typography>
            </React.Fragment>
          ) : (
            <form onSubmit={handleNext}>
              {getStepContent(
                activeStep,
                props.activeOrder,
                props.activeOrder.type,
                props.activeOrder.kind
              )}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Powrót
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Potwierdź" : "Dalej"}
                </Button>
              </div>
            </form>
          )}
        </React.Fragment>
      </Paper>
    </React.Fragment>
  );
}
const mapStateToProps = (state, props) => {
  const { orderId } = props.match.params;
  return {
    activeOrder: activeOrder(state, orderId)
  };
};

export default connect(mapStateToProps)(Checkout);
