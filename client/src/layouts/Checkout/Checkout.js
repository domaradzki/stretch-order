import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { activeOrder } from "../../ducks/data";
import NewOrderSuccess from "../../components/NewOrderSuccess/NewOrderSuccess";
import GetStepContent from "../../components/GetStepContent/GetStepContent";
import FormStepper from "../../components/FormStepper/FormStepper";
import FormButtons from "../../components/FormButtons/FormButtons";

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

const stepsProduct = ["Informacje ogólne", "Parametry produktu", "Weryfikacja"];
const stepsTransportOnly = ["Informacje ogólne", "Weryfikacja"];

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = event => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = event => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };
  const { activeOrder } = props;

  const initialValues = {
    client: activeOrder.client,
    quantity: activeOrder.quantity,
    price: activeOrder.price,
    netValue: activeOrder.netValue,
    details: `${activeOrder.details} ${
      activeOrder.postfix ? activeOrder.postfix : ""
    }`,
    deliveryAddress: activeOrder.deliveryAddress,
    transport: "",
    margin: "",
    dateInsert: activeOrder.dateInsert,
    dateOfRealisation: activeOrder.dateOfRealisation,
    dateOfPay: null,
    sleeve: activeOrder.sleeve,
    stretchColor: activeOrder.stretchColor,
    stretchThickness: activeOrder.stretchThickness,
    netWeight: activeOrder.netWeight,
    grossWeight: activeOrder.grossWeight,
    tapeLong: activeOrder.tapeLong,
    tapeWidth: activeOrder.tapeWidth,
    tapeThickness: activeOrder.tapeThickness,
    tapeColor: activeOrder.tapeColor,
    numberOfColors: activeOrder.numberOfColors,
    glue: activeOrder.glue,
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
  const steps =
    activeOrder.kind === "KT" &&
    (activeOrder.type === "FS" || activeOrder.type === "TPD")
      ? stepsProduct
      : stepsTransportOnly;
  console.log(props);
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <FormStepper steps={steps} activeStep={activeStep} />
        <React.Fragment>
          {activeStep === steps.length ? (
            <NewOrderSuccess />
          ) : (
            <form onSubmit={handleNext}>
              <GetStepContent
                step={activeStep}
                stepsLength={steps.length}
                input={input}
                activeOrder={activeOrder}
                type={activeOrder.type}
                kind={activeOrder.kind}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
              />
              <FormButtons
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                history={props.history}
              />
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
