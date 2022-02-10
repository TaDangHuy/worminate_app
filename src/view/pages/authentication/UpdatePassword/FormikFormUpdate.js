import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SnackbarCustom from "../../../../components/SnackbarCustom";

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
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password should be of minimum 8 characters length"),
  confirmNewPassword: Yup.string()
    .required("Confirm new Password is required")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm password must match with new password"
    )
    .min(8, "Password should be of minimum 8 characters length"),
});

function FormikFormUpdate({ history }) {
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
          history.push("/login");
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

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});

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
              <Typography sx={{ mb: 1 }}>New Password</Typography>
              <TextField
                fullWidth
                aria-describedby="newPassword_helper_text"
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            newPassword: !prev.newPassword,
                          }));
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {showPassword.newPassword ? (
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
                {touched.newPassword && errors.newPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1 }}>Confirm new Password</Typography>
              <TextField
                fullWidth
                aria-describedby="confirmNewPassword_helper_text"
                type={showPassword.confirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmNewPassword &&
                  Boolean(errors.confirmNewPassword)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((prev) => ({
                            ...prev,
                            confirmNewPassword: !prev.confirmNewPassword,
                          }));
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {showPassword.confirmNewPassword ? (
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
                {touched.confirmNewPassword && errors.confirmNewPassword}
              </FormHelperText>
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

export default FormikFormUpdate;
