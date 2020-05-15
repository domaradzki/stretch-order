import React, { useState } from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NewOrderSuccess from '../../components/NewOrderSuccess/NewOrderSuccess';
import GetStepContent from '../../components/GetStepContent/GetStepContent';
import FormStepper from '../../components/FormStepper/FormStepper';
import FormButtons from '../../components/FormButtons/FormButtons';

import getOrderById from '../../graphql/queries/getOrderById';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const stepsProduct = ['Informacje ogólne', 'Parametry produktu', 'Weryfikacja'];
const stepsTransportOnly = ['Informacje ogólne', 'Weryfikacja'];

function EditOrder(props) {
  const { loading, error, order } = props.data;

  if (loading) {
    return <div>...loading</div>;
  }
  if (error) return <p>ERROR</p>;
  if (!order) return <p>Not found</p>;

  if (order) {
    console.log(order);
    const classes = useStyles();
    const initialValues = {
      quantity: order.quantity,
      unit: order.unit,
      price: order.price,
      type: order.type,
      kind: order.kind,
      margin: order.margin,
      netValue: order.netValue,
      details: order.document.details,
      deliveryAddress: order.document.deliveryAddress,
      transport: order.document.transport,

      paymentMethod: order.document.paymentMethod,
      dateInsert: order.document.dateInsert,
      dateOfRealisation: order.document.dateOfRealisation,
      dateOfPay: order.document.dateOfPay,
      user: order.document.user.name,
      client: order.document.client.name,
      //   sleeve: order.sleeve,
      //   stretchColor: order.stretchColor,
      //   stretchThickness: order.stretchThickness,
      //   netWeight: order.netWeight,
      //   grossWeight: order.grossWeight,
      //   tapeLong: order.tapeLong,
      //   tapeWidth: order.tapeWidth,
      //   tapeThickness: order.tapeThickness,
      //   tapeColor: order.tapeColor,
      //   numberOfColors: order.numberOfColors,
      //   glue: order.glue,
      //   printName: order.glue,
      //   roller: order.glue,
      //   dateOfAcceptation: order.dateOfAcceptation,
      //   color1: order.glue,
      //   color2: order.glue,
      //   color3: order.glue,
      //   file: null,
    };
    const [activeStep, setActiveStep] = useState(0);
    const [input, setInput] = useState(initialValues);

    const handleNext = (event) => {
      event.preventDefault();
      setActiveStep(activeStep + 1);
    };

    const handleBack = (event) => {
      event.preventDefault();
      setActiveStep(activeStep - 1);
    };

    const handleInputChange = (event) => {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    };

    const handleDateChange = (inputDate) => (date) => {
      setInput({
        ...input,
        [inputDate]: date,
      });
    };

    const handleChangeFile = async ({ target }) => {
      setInput({
        ...input,
        file: target.files[0],
      });
    };

    const steps =
      input.kind === 'KT' && (input.type === 'FS' || input.type === 'TPD')
        ? stepsProduct
        : stepsTransportOnly;

    const handleAddOrder = (event) => {
      event.preventDefault();
      setActiveStep(activeStep + 1);
    };
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
              <form
                onSubmit={handleNext}
                encType="multipart/form-data"
                method="POST"
              >
                <GetStepContent
                  step={activeStep}
                  stepsLength={steps.length}
                  input={input}
                  activeOrder={input}
                  type={input.type}
                  kind={input.kind}
                  handleInputChange={handleInputChange}
                  handleDateChange={handleDateChange}
                  handleChangeFile={handleChangeFile}
                />
                <FormButtons
                  steps={steps}
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleAddOrder={handleAddOrder}
                  history={props.history}
                />
              </form>
            )}
          </React.Fragment>
        </Paper>
      </React.Fragment>
    );
  }
}

const graphqlGetOrder = graphql(getOrderById, {
  options: (props) => {
    return {
      variables: {
        id: props.match.params.orderId,
      },
    };
  },
});

export default compose(graphqlGetOrder)(EditOrder);
