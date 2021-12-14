import React from "react";
import { Box } from "@mui/system";
import { Typography, Card } from "@mui/material";

import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import FormikFormRegister from "./FormikFormRegister";

const useStyles = makeStyles({
  container: {
    padding: "20px 20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  banner: {
    height: "450px",
    width: "100%",
    backgroundColor: "rgb(92,212,201)",
    borderRadius: "20px",
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
  },
  banner_logo: {
    textTransform: "uppercase",
    alignSelf: "flex-start",
  },
  banner_title: {
    textTransform: "capitalize",
  },
  banner_subtitle: {
    width: 600,
    textAlign: "center",
  },
  form_container: {
    height: "610px",
    width: "450px",
    zIndex: 2,
    position: "relative",
    transform: "translateY(-100px)",
  },
  card: {
    padding: "50px 45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link1: {
    textDecoration: "none",
    color: "white",
  },
});

const Register = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.banner}>
        <Typography
          variant="h5"
          className={classes.banner_logo}
          sx={{ mb: "50px" }}
        >
          <Link to="/" className={classes.link1}>
            Logo-Worminate
          </Link>
        </Typography>
        <Typography
          variant="h3"
          className={classes.banner_title}
          sx={{ fontWeight: "bold", mb: "30px" }}
        >
          Welcome
        </Typography>
        <Typography variant="h6" className={classes.banner_subtitle}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Typography>
      </Box>
      <Box className={classes.form_container}>
        <Card className={classes.card}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: "30px" }}>
            Register
          </Typography>

          <FormikFormRegister />
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
