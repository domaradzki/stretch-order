import React, { useState } from "react";
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

import addDays from "date-fns/addDays";
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

function getStepContent(step, dataOrder, type, kind) {
  switch (step) {
    case 0:
      return <BasicInfoForm dataOrder={dataOrder} />;
    case 1:
      return type === "TPD" && kind === "KT" ? (
        <TapeForm dataOrder={dataOrder} />
      ) : type === "FS" && kind === "KT" ? (
        <StretchForm dataOrder={dataOrder} />
      ) : (
        <TransportForm dataOrder={dataOrder} />
      );
    case 2:
      return <Review dataOrder={dataOrder} />;
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

  const { activeOrder } = props;
  console.log(activeOrder);
  const dataOrder = {
    ...activeOrder,
    grossWeight:
      typeof activeOrder.grossWeight === "function"
        ? activeOrder.grossWeight()
        : activeOrder.grossWeight,
    stretchColor:
      typeof activeOrder.stretchColor === "function"
        ? activeOrder.stretchColor()
        : activeOrder.stretchColor,
    details:
      typeof activeOrder.postfix === "function"
        ? `${activeOrder.details} ${activeOrder.postfix()}`
        : activeOrder.details,
    dateOfRealisation:
      activeOrder.type === "TPD" && activeOrder.kind === "KT"
        ? addDays(new Date(activeOrder.dateInsert), 14)
        : activeOrder.type === "FS" && activeOrder.kind === "KT"
        ? addDays(new Date(activeOrder.dateInsert), 3)
        : addDays(new Date(activeOrder.dateInsert), 2)
  };

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
                dataOrder,
                dataOrder.type,
                dataOrder.kind
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
