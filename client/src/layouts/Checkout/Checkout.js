import React from "react";
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

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfoForm />;
    case 1:
      return <StretchForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // useEffect(() => {
  //   const { orderId } = this.props.match.params;
  // });

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
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Powrót
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Potwierdź" : "Dalej"}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </React.Fragment>
  );
}
