import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { activeOrder } from '../../ducks/data';
import NewOrderSuccess from '../../components/NewOrderSuccess/NewOrderSuccess';
import GetStepContent from '../../components/GetStepContent/GetStepContent';
import FormStepper from '../../components/FormStepper/FormStepper';
import FormButtons from '../../components/FormButtons/FormButtons';

import addOrderMutation from '../../graphql/mutations/addOrderMutation';
import addDocumentMutation from '../../graphql/mutations/addDocumentMutation';
import addClientMutation from '../../graphql/mutations/addClientMutation';
import addUserMutation from '../../graphql/mutations/addUserMutation';
import addTapeMutation from '../../graphql/mutations/addTapeMutation';
import addStretchMutation from '../../graphql/mutations/addStretchMutation';
import isInDatabase from '../../graphql/queries/isInDatabase';
import getOrdersItemid from '../../graphql/queries/getOrdersItemid';
import singleUploadFile from '../../graphql/mutations/singleUploadFile';

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

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (event) => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = (event) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };
  const { activeOrder } = props;

  const initialValues = {
    client: activeOrder.client,
    quantity: activeOrder.quantity,
    unit: activeOrder.unit,
    price: activeOrder.price,
    netValue: activeOrder.netValue,
    details: `${activeOrder.details} ${
      activeOrder.postfix ? activeOrder.postfix : ''
    }`,
    deliveryAddress: activeOrder.deliveryAddress,
    transport: '',
    margin: '',
    paymentMethod: '',
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
    printName: '',
    roller: '',
    dateOfAcceptation: null,
    color1: '',
    color2: '',
    color3: '',
    file: null,
  };

  const [input, setInput] = React.useState(initialValues);
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
    activeOrder.kind === 'KT' &&
    (activeOrder.type === 'FS' || activeOrder.type === 'TPD')
      ? stepsProduct
      : stepsTransportOnly;

  const handleAddOrder = (event) => {
    event.preventDefault();
    const data = Object.assign(activeOrder, input);
    const {
      client,
      quantity,
      price,
      netValue,
      margin,
      details,
      dateInsert,
      invoice,
      dateOfPay,
      dateOfRealisation,
      paymentMethod,
      deliveryAddress,
      trader,
      transport,
      assortment,
      signature,
      documentStatus,
      closed,
      symbol,
      itemId,
      code,
      kind,
      type,
      unit,
      currency,
      exchangeRate,
      numberOfDocumentInvoice,
      companyId,
      documentId,
      sleeve,
      stretchColor,
      stretchThickness,
      netWeight,
      grossWeight,
      printName,
      tapeLong,
      tapeWidth,
      tapeThickness,
      tapeColor,
      numberOfColors,
      glue,
      roller,
      color1,
      color2,
      color3,
      dateOfAcceptation,
      file,
    } = data;
    if (!props.data.isLoading) {
      const isClient = props.data.client;
      const isUser = props.data.user;
      const isDocument = props.data.document;
      const isTapeProduct = kind === 'KT' && type === 'TPD';
      const isStretchProduct = kind === 'KT' && type === 'FS';

      const addingTapeProject = () =>
        file
          ? props
              .singleUploadFile({ variables: { file } })
              .then((res) => res.data.singleUpload.id)
          : Promise.resolve(null);

      const addingClient = () =>
        props
          .addClientMutation({
            variables: {
              name: client,
              companyId,
            },
          })
          .then((res) => res.data.addClient.id);

      const addingUser = () =>
        props
          .addUserMutation({
            variables: {
              name: trader,
            },
          })
          .then((res) => res.data.addUser.id);

      const addingTape = async (projectId) =>
        await props
          .addTapeMutation({
            variables: {
              printName,
              dateOfAcceptation,
              numberOfColors,
              color1,
              color2,
              color3,
              glue,
              roller,
              tapeColor,
              tapeLong,
              tapeThickness,
              tapeWidth,
              projectId,
            },
          })
          .then((res) => res.data.addTape.id);

      const addingStretch = async () =>
        await props
          .addStretchMutation({
            variables: {
              sleeve,
              stretchColor,
              stretchThickness,
              netWeight,
              grossWeight,
            },
          })
          .then((res) => res.data.addStretch.id);

      const addingOrder = async (idDoc, idProduct) =>
        await props.addOrderMutation({
          variables: {
            itemId,
            name: assortment,
            code,
            kind,
            type,
            quantity,
            unit,
            price,
            netValue,
            margin: +margin,
            documentId: idDoc,
            productId: idProduct,
          },
          refetchQueries: [{ query: getOrdersItemid }],
        });

      const addingDocument = (idC, idU) =>
        props
          .addDocumentMutation({
            variables: {
              documentId,
              dateInsert,
              dateOfPay,
              dateOfRealisation,
              paymentMethod,
              signature,
              symbol,
              details,
              closed,
              currency,
              exchangeRate,
              documentStatus,
              deliveryAddress,
              transport,
              numberOfDocumentInvoice,
              invoice,
              clientId: idC,
              userId: idU,
            },
          })
          .then((res) => res.data.addDocument.id);

      const promiseIfNoClient = async () =>
        isClient ? isClient.id : await addingClient();

      const promiseIfNoUser = async () =>
        isUser ? isUser.id : await addingUser();

      const promiseIfNoDocument = async (idC, idU) =>
        isDocument ? isDocument.id : await addingDocument(idC, idU);

      const addingProduct = isTapeProduct
        ? addingTapeProject().then((res) => addingTape(res))
        : isStretchProduct
        ? addingStretch()
        : null;

      Promise.all([promiseIfNoClient(), promiseIfNoUser(), addingProduct])
        .then((result) => {
          console.log('result', result);
          return {
            clientId: result[0],
            userId: result[1],
            productId: result[2],
          };
        })
        .then((res) => {
          promiseIfNoDocument(res.clientId, res.userId).then((r) => {
            addingOrder(r, res.productId);
          });
        });
    }
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
                activeOrder={activeOrder}
                type={activeOrder.type}
                kind={activeOrder.kind}
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

const mapStateToProps = (state, props) => {
  const { orderId } = props.match.params;
  return {
    activeOrder: activeOrder(state, orderId),
  };
};
const reduxWrapper = connect(mapStateToProps);

const graphqlOrder = graphql(addOrderMutation, { name: 'addOrderMutation' });
const graphqlDocument = graphql(addDocumentMutation, {
  name: 'addDocumentMutation',
});
const graphqlClient = graphql(addClientMutation, {
  name: 'addClientMutation',
});
const graphqlUser = graphql(addUserMutation, {
  name: 'addUserMutation',
});
const graphqlTape = graphql(addTapeMutation, { name: 'addTapeMutation' });
const graphqlStretch = graphql(addStretchMutation, {
  name: 'addStretchMutation',
});
const graphqlFile = graphql(singleUploadFile, {
  name: 'singleUploadFile',
});

const graphqlCheck = graphql(isInDatabase, {
  options: (props) => {
    return {
      variables: {
        documentId: props.activeOrder.documentId,
        companyId: props.activeOrder.companyId,
        name: props.activeOrder.trader,
      },
    };
  },
});
export default compose(
  reduxWrapper,
  graphqlOrder,
  graphqlDocument,
  graphqlClient,
  graphqlUser,
  graphqlTape,
  graphqlStretch,
  graphqlFile,
  graphqlCheck
)(Checkout);
