import React, { useState } from "react";
import { connect } from "react-redux";
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

import addDays from "date-fns/addDays";
import { activeOrder } from "../../ducks/data";

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

function getStepContent(
  step,
  input,
  type,
  kind,
  handleInputChange,
  handleDateChange,
  handleSkipStep
) {
  if (step === 0) {
    return (
      <BasicInfoForm
        input={input}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
    );
  } else if (step === 1) {
    if (type === "TPD" && kind === "KT") {
      return (
        <TapeForm
          input={input}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
        />
      );
    } else if (type === "FS" && kind === "KT") {
      return (
        <StretchForm input={input} handleInputChange={handleInputChange} />
      );
    } else handleSkipStep();
  }
  if (step === 2) {
    return <Review input={input} />;
  }
}

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = event => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleSkipStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = event => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };
  const { activeOrder } = props;

  const dataOrder = {
    ...activeOrder,
    tapeColor:
      typeof activeOrder.tapeColor === "function"
        ? activeOrder.tapeColor()
        : activeOrder.tapeColor,
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

  const initialValues = {
    client: dataOrder.client,
    quantity: dataOrder.quantity,
    price: dataOrder.price,
    netValue: dataOrder.netValue,
    details: dataOrder.details,
    deliveryAddress: dataOrder.deliveryAddress,
    transport: "",
    margin: "",
    dateInsert: dataOrder.dateInsert,
    dateOfRealisation: dataOrder.dateOfRealisation,
    dateOfPay: null,
    sleeve: "" || dataOrder.sleeve,
    stretchColor: "" || dataOrder.stretchColor,
    stretchThickness: "" || dataOrder.stretchThickness,
    netWeight: "" || dataOrder.netWeight,
    grossWeight: "" || dataOrder.grossWeight,
    tapeLong: "" || dataOrder.tapeLong,
    tapeWidth: "" || dataOrder.tapeWidth,
    tapeThickness: "" || dataOrder.tapeThickness,
    tapeColor: "" || dataOrder.tapeColor,
    numberOfColors: "" || dataOrder.numberOfColors,
    glue: "" || dataOrder.glue,
    printName: "",
    roller: "",
    dateOfAcceptation: null,
    color1: "",
    color2: "",
    color3: ""
  };

  const [input, setInput] = React.useState(initialValues);
  const handleInputChange = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = inputDate => date => {
    setInput({
      ...input,
      [inputDate]: date
    });
  };
  console.log(activeOrder);
  console.log(input);
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
                input,
                dataOrder.type,
                dataOrder.kind,
                handleInputChange,
                handleDateChange,
                handleSkipStep
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
