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
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  link2: {
    textDecoration: "none",
    color: "blue",
  },
  submitButton: {},
});

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

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/login",
      data: values,
    })
      .then((res) => {
        console.log(res.status);
        if (res) history.history.push("/");
      })
      .catch((error) => {
        console.log({ error });
      });
  };
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
                margin="normal"
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
                backgroundColor: "rgb(92, 212, 201)",
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikForm;
