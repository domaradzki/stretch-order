import React from "react";
import Typography from "@material-ui/core/Typography";

const NewOrderSuccess = () => {
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
    </React.Fragment>
  );
};

export default NewOrderSuccess;
