import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Card, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FormikFormLogin from "./FormikFormLogin";

import { accountService } from "../../../../_services";

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
  signInWithButton: {
    width: "75px",
    height: "75px",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#81E6D9",
    },
  },
  link1: {
    textDecoration: "none",
    color: "white",
  },
});

const Login = (history) => {
  const classes = useStyles();

  useEffect(() => {
    // redirect to home if already logged in
    if (accountService.accountValue) {
      history.push("/");
    }
  }, [history]);

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
          Welcome Back !
        </Typography>
        <Typography variant="h6" className={classes.banner_subtitle}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Typography>
      </Box>
      <Box className={classes.form_container}>
        <Card className={classes.card}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: "30px" }}>
            Sign In with
          </Typography>

          <Stack direction="row" spacing={3} sx={{ mb: "30px" }}>
            <Button className={classes.signInWithButton} variant="outlined">
              <GoogleIcon />
            </Button>

            <Button className={classes.signInWithButton} variant="outlined">
              <GitHubIcon />
            </Button>

            <Button
              className={classes.signInWithButton}
              variant="outlined"
              onClick={accountService.login}
            >
              <FacebookIcon />
            </Button>
          </Stack>

          <Divider>OR</Divider>

          <Typography variant="subtitle1" sx={{ my: 2 }}>
            Sign In with Email Address
          </Typography>

          <FormikFormLogin history={history} />
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
