import React, { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContext } from "../../context/SnackbarProvider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
// const Alert = React.forwardRef<HTMLDivElement, AlertProps(function Alert(
//     props,
//     ref,
//   ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

export default function CustomizeSnackbar() {
  const { snackbarOpen, snackbarType, snackbarMessage, callSnackbar } =
    useContext(SnackbarContext);

// console.log(snackbarOpen,snackbarType,snackbarMessage);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    callSnackbar(false, snackbarType, snackbarMessage);
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
