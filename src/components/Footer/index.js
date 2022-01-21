import React from "react";
import { Paper, Container, Typography, Grid } from "@mui/material";

function Footer() {
  return (
    <Paper
      elevation={2}
      sx={{ mt: 10, pt: 3, pb: 2, backgroundColor: "#3b8767" }}
    >
      <Container maxWidth="md">
        <Grid sx={{ height: "10vh" }} container alignItems="center">
          <Grid sm={7} item sx={{ ml: -16.5 }}>
            <Typography sx={{ fontSize: "17px" }} color="#fff">
              Address : 01 Dai Co Viet, Hai Ba Trung, Ha Noi
            </Typography>
            <Typography sx={{ fontSize: "17px" }} color="#fff">
              Email : tokyo.example@gmail.com
            </Typography>
          </Grid>
          <Grid sm={5} item sx={{ ml: 7.5, pl: 3 }}>
            <Typography sx={{ fontSize: "17px" }} color="#fff">
              &copy; Copyright 2021. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
