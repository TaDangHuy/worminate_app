import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import SnackbarCustom from "../../../components/SnackbarCustom";
import CustomInput from "../../../components/CustomInput";

const validationSchema = yup.object({
  fullName: yup.string("Full Name").required("Name is required"),
  password: yup
    .string("Current Password")
    .required("Current Password is required")
    .min(8, "Password should be of minimum 8 characters length"),
  newPassword: yup
    .string("New Password")
    .notOneOf(
      [yup.ref("password")],
      "New Password must not match with Current Password"
    )
    .min(8, "Password should be of minimum 8 characters length"),
  confirmPassword: yup
    .string("Confirm Password")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm password must match with new password"
    )
    .min(8, "Passsword should be of minimum 8 characters length"),
});

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");

const snackbarProps = {
  success: {
    severity: "success",
    message: "Updated successfully",
  },
  error: {
    severity: "error",
    message: "Incorrect password",
  },
};
function ProfileForm({
  fullName,
  avatar,
  setFullNameProp,
  // setIsChangedAvatarProp,
}) {
  const formik = useFormik({
    initialValues: {
      fullName: fullName,
      password: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      let { confirmPassword, ...data } = values;
      data = { ...data, image: avatar };
      axios({
        method: "PUT",
        url: `/user/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: data,
      })
        .then((response) => {
          localStorage.setItem("UserName", response.data.user.fullName);
          localStorage.setItem("avatar", response.data.user.image.path);
          // setIsChangedAvatarProp(true);
          setFullNameProp(response.data.user.fullName);
          setSnackbarProps(snackbarProps.success);
        })
        .catch((error) => {
          setSnackbarProps(snackbarProps.error);
        })
        .finally(() => {
          setOpenSnackbar(true);
          setOpenBackdrop(false);
        });
    },
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [snackbarprops, setSnackbarProps] = useState({});

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="fullName">
                <Typography variant="h5" color="textSecondary">
                  Full Name
                </Typography>
              </InputLabel>
              <CustomInput
                id="fullName"
                fullWidth
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth disabled>
              <InputLabel shrink htmlFor="email">
                <Typography variant="h5" color="textSecondary">
                  Email
                </Typography>
              </InputLabel>
              <CustomInput id="email" value={email} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="password">
                <Typography variant="h5" color="textSecondary">
                  Current Password
                </Typography>
              </InputLabel>
              <CustomInput
                id="password"
                aria-describedby="password_helper_text"
                type={showPassword.password ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          password: !showPassword.password,
                        });
                      }}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showPassword.password ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error id="password_helper_text">
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="newPassword">
                <Typography variant="h5" color="textSecondary">
                  New Password
                </Typography>
              </InputLabel>
              <CustomInput
                id="newPassword"
                aria-describedby="newPassword_helper_text"
                type={showPassword.newPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          newPassword: !showPassword.newPassword,
                        });
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
                }
              />
              <FormHelperText error id="newPassword_helper_text">
                {formik.touched.newPassword && formik.errors.newPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="confirmPassword">
                <Typography variant="h5" color="textSecondary">
                  Confirm Password
                </Typography>
              </InputLabel>
              <CustomInput
                id="confirmPassword"
                aria-describedby="confirmPassword_helper_text"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          confirmPassword: !showPassword.confirmPassword,
                        });
                      }}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error id="confirmPassword_helper_text">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>

        <SnackbarCustom
          openSnackbarProp={openSnackbar}
          setOpenSnackbarProp={(value) => {
            setOpenSnackbar(value);
          }}
          snackbarprops={snackbarprops}
        />
        <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>
    </div>
  );
}

export default ProfileForm;
