import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import SnackbarCustom from "../../../../components/SnackbarCustom";
import CustomInput from "../../../../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";

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
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});

  const formik = useFormik({
    initialValues: {
      email: undefined,
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email!")
        .required("Email is required!"),
    }),
    onSubmit: (values) => {
      axios({
        method: "POST",
        url: `/forgot-password`,
        data: { email: values.email },
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
    },
  });
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
        <form onSubmit={formik.handleSubmit}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="email">
              <Typography variant="h5" color="textSecondary">
                Email
              </Typography>
            </InputLabel>
            <CustomInput
              type="email"
              id="email"
              aria-describedby="email_helper_text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <FormHelperText error id="email_helper_text">
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, alignSelf: "flex-start" }}
          >
            Reset Password
          </Button>
        </form>
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
