import React from "react";
import { Box } from "@mui/system";
import { Typography, Card, Stack } from "@mui/material";

import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import FormikFormRegister from "./FormikFormRegister";
import Footer from "../../../../components/Footer";

const useStyles = makeStyles({
  container: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "-150px",
  },
  banner: {
    height: "300px",
    width: "100%",
    backgroundColor: "#3b8767",
    padding: "10px 40px",
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
    <>
      <Box className={classes.container}>
        <Box className={classes.banner}>
          {/* <Typography
            variant="h5"
            className={classes.banner_logo}
            sx={{ mb: "50px" }}
          >
            <Link to="/" className={classes.link1}>
              Worminate
            </Link>
          </Typography> */}
          <Box sx={{ alignSelf: "flex-start" }}>
            <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Stack direction="row" alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: 70,
                    width: 65,
                    marginRight: 1,
                    marginLeft: 1,
                    marginTop: -0.9,
                  }}
                  src={require("../../../../assets/images/logo.png").default}
                  alt="worminate-token"
                />
                <Typography variant="h5" component="div" sx={{ mr: "20px" }}>
                  WORMINATE
                </Typography>
              </Stack>
            </Link>
          </Box>
          <Typography
            variant="h3"
            className={classes.banner_title}
            sx={{ fontWeight: "bold", mb: "30px" }}
          >
            Welcome !
          </Typography>
          <Typography
            variant="h6"
            className={classes.banner_subtitle}
          ></Typography>
        </Box>
        <Box className={classes.form_container}>
          <Card className={classes.card} elevation={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: "30px" }}>
              Register
            </Typography>

            <FormikFormRegister />
          </Card>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
