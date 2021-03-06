import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SnackbarCustom({
  openSnackbarProp,
  setOpenSnackbarProp,
  snackbarprops,
  width,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbarProp}
      autoHideDuration={4000}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenSnackbarProp(false);
      }}
    >
      <Alert
        sx={{ width: { width } }}
        severity={snackbarprops?.severity}
        variant="filled"
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setOpenSnackbarProp(false);
        }}
      >
        {snackbarprops?.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarCustom;
