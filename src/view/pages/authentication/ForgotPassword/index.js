import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import SnackbarCustom from "../../../../components/SnackbarCustom";

const snackbarProps = {
  success: {
    severity: "success",
    message: "Please check your email !",
  },
  error: {
    severity: "error",
    message: "Something went wrong !!!",
  },
};

function ForgotPassWord({ history }) {
  const [value, setValue] = useState("");

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mt: 2 }}>
          Forgot Password
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
          onClick={() => {
            axios({
              method: "POST",
              url: `/forgot-password`,
              // headers: {
              //   // Authorization: `Bearer ${localStorage.getItem("token")}`,
              // },
              data: { email: value },
            })
              .then((res) => {
                setSnackbarProps(snackbarProps.success);
                setOpenSnackbar(true);
              })
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  setSnackbarProps(snackbarProps.error);
                  setOpenSnackbar(true);
                }
              });
          }}
        >
          Reset Password
        </Button>
      </Box>
      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </Container>
  );
}

export default ForgotPassWord;
