import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const NewOrderSuccess = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Sukces!!!
      </Typography>
      <Typography variant="subtitle1">
        Twoje zamówienie zostało poprawnie dodane. Możesz je monitorować, lub
        edytować w zakładce zlecone, gdzie znajdziesz wszystkie swoje
        zamówienia.
      </Typography>
      <div className={classes.buttons}>
        <Link to={`/new`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            OK
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NewOrderSuccess;
