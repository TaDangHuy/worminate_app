import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SnackbarCustom from "../../../../components/SnackbarCustom";

const useStyles = makeStyles({
  link2: {
    textDecoration: "none",
    color: "blue",
  },
});

const snackbarProps = {
  error: {
    severity: "error",
    message: "Incorrect username or password",
  },
};

const intitialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be of minimum 8 characters length"),
});

function FormikForm({ history }) {
  const classes = useStyles();

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
          if (res.data.user.admin) history.push("/admin");
          else history.push("/home");
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

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarprops, setSnackbarProps] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={intitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        } = formikProps;
        return (
          <Form>
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
                  <Typography color="primary">Forgot Password</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" className={classes.link2}>
                  <Typography color="primary">
                    Don't have an account? Sign Up
                  </Typography>
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
