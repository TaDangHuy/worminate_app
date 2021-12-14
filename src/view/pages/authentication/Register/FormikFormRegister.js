import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

function FormikFormRegister() {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/user",
      data: { ...values },
    })
      .then((res) => {
        console.log({ res });
        // if(res) history.history.push("/");
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { values, handleChange, handleBlur } = formikProps;
        return (
          <Form sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Full Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    margin="normal"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Password"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "rgb(92, 212, 201)" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikFormRegister;
