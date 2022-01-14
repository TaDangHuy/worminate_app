import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
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
    message: "Upload success",
  },
  error: {
    severity: "error",
    message: "Username or password incorrect",
  },
};

function FormikForm({ history }) {
  const classes = useStyles();

  const intitialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, actions) => {
    axios({
      method: "post",
      url: "/login",
      data: values,
    })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("UserName", res.data.user.fullName);
          localStorage.setItem("isAdmin", res.data.user.admin);
          localStorage.setItem("_id", res.data.user["_id"]);
          localStorage.setItem("email", res.data.user.email);
          localStorage.setItem("avatar", res.data.user.image.path);
          history.history.push("/home");
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);

        if (error.response.status === 404) {
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
              <TextField
                // margin="normal"
                required
                fullWidth
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

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
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" className={classes.link2}>
                  Forgot Password
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" className={classes.link2}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

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
