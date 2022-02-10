import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email!").required("Required!"),
  password: Yup.string()
    .required("Required!")
    .min(8, "Password should be of minimum 8 characters length"),
});

function FormikFormRegister() {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [showPassword, setShowPassword] = useState(false);

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
        const { values, errors, touched, handleChange, handleBlur } =
          formikProps;
        return (
          <Form sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Typography sx={{ mb: -1, textAlign: "left" }}>
                Full Name
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                name="fullName"
                aria-describedby="fullName_helper_text"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
              />
              <FormHelperText error id="fullName_helper_text">
                {touched.fullName && errors.fullName}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <Typography sx={{ mb: 1, textAlign: "left" }}>Email</Typography>
              <TextField
                fullWidth
                type="email"
                name="email"
                aria-describedby="email_helper_text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
              />
              <FormHelperText error id="email_helper_text">
                {touched.email && errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1, textAlign: "left" }}>
                Password
              </Typography>
              <TextField
                fullWidth
                aria-describedby="password_helper_text"
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error id="password_helper_text">
                {touched.password && errors.password}
              </FormHelperText>
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
