import * as Yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useModal } from "react-hooks-use-modal";

function FormikFormRegister() {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

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
      url: "/user",
      data: { ...values },
    })
      .then((res) => {
        console.log({ res });
        open();
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
            <FormControl fullWidth>
              <Typography sx={{ mb: -1 }}>Full Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                // label="Full Name"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography sx={{ mb: -1 }}>Email</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // label="Email"
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography sx={{ mb: -1 }}>Password</Typography>
              <TextField
                required
                margin="normal"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                // label="Password"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#3b8767" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography color="primary">
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>

            {/* Modal */}
            <Modal>
              <div
                style={{
                  backgroundColor: "white",
                  height: "300px",
                  width: "450px",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <p>
                  Please check your email and click{" "}
                  <Link to="/login">here</Link> to login
                </p>
              </div>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikFormRegister;
