import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SnackbarCustom from "../../../../components/SnackbarCustom";

const useStyles = makeStyles({
  link2: {
    textDecoration: "none",
    color: "blue",
  },
  submitButton: {},
});

const snackbarProps = {
  success: {
    severity: "success",
    message: "Update password successfully",
  },
  error: {
    severity: "error",
    message: "Something went wrong !!!",
  },
};
const intitialValues = {
  newPassword: "",
  confirmNewPassword: "",
};
const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Required"),
  confirmNewPassword: Yup.string().required("Required"),
});
function FormikForm({ history }) {
  const classes = useStyles();

  let { token } = useParams();

  const onSubmit = (values, actions) => {
    axios({
      method: "PUT",
      url: `/reset-password/${token}`,
      data: { password: values.newPassword },
    })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", token);
          history.push("/home");
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);

        if (error.response && error.response.status === 404) {
          setSnackbarProps(snackbarProps.error);
          setOpenSnackbar(true);
        }
      });
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});

  return (
    <Formik
      initialValues={intitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { values, handleChange, handleBlur, isSubmitting } = formikProps;
        return (
          <Form>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1 }}>New Password</Typography>
              <TextField
                required
                fullWidth
                type="password"
                name="password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1 }}>Confirm New Password</Typography>
              <TextField
                required
                fullWidth
                type="password"
                name="password"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>

            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              loading={isSubmitting}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#3b8767",
              }}
              className={classes.submitButton}
            >
              Update
            </LoadingButton>

            <SnackbarCustom
              openSnackbarProp={openSnackbar}
              setOpenSnackbarProp={(value) => {
                setOpenSnackbar(value);
              }}
              snackbarprops={snackbarprops}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikForm;
