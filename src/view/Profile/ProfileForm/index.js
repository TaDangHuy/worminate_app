import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/system";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import SnackbarCustom from "../../../components/SnackbarCustom";

const validationSchema = yup.object({
  fullName: yup.string("Full Name").required("Name is required"),
  password: yup
    .string("Current Password")
    .required("Current Password is required"),
  newPassword: yup
    .string("New Password")
    .min(6, "Password should be of minimum 8 characters length")
    .required("Current Password is required"),
  confirmPassword: yup
    .string("Confirm Password")
    .min(6, "Passsword should be of minimum 8 characters length"),
});

const CustomInput = styled(OutlinedInput)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    // border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Nunito Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");

const snackbarProps = {
  success: {
    severity: "success",
    message: "Upload success",
  },
  error: {
    severity: "error",
    message: "Cannot update password, password is invalid",
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
      password: null,
      newPassword: null,
      confirmPassword: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
          setOpenSnackbar(true);
        })
        .catch((error) => {
          setSnackbarProps(snackbarProps.error);
          setOpenSnackbar(true);
        });
    },
  });

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});

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
                // helperText={formik.touched.fullName && formik.errors.fullName}
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
                type={showPassword.password ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                // helperText={
                //   formik.touched.password && formik.errors.password
                // }
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
                      onMouseDown={handleMouseDownPassword}
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
                type={showPassword.newPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                // helperText={
                //   formik.touched.newPassword && formik.errors.newPassword
                // }
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
                      onMouseDown={handleMouseDownPassword}
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
                type={showPassword.confirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                // helperText={
                //   formik.touched.confirmPassword &&
                //   formik.errors.confirmPassword
                // }
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
                      onMouseDown={handleMouseDownPassword}
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
      </form>
    </div>
  );
}

export default ProfileForm;
