import React from "react";
import { Paper, Container, Typography, Grid } from "@mui/material";

function Footer() {
  return (
    <Paper
      elevation={4}
      sx={{
        mt: 10,
        pt: 2.5,
        pb: 3,
        backgroundColor: "#3b8767",
        borderRadius: 0,
      }}
    >
      <Container maxWidth="md">
        <Grid sx={{ height: "6vh" }} container alignItems="center">
          <Grid sm={7} item sx={{ ml: -16.5 }}>
            <Typography variant="body1" color="#fff">
              Address : 01 Dai Co Viet, Hai Ba Trung, Ha Noi
            </Typography>
            <Typography svariant="body1" color="#fff">
              Email : tokyo.example@gmail.com
            </Typography>
          </Grid>
          <Grid sm={5} item sx={{ ml: 7.5, pl: 3 }}>
            <Typography variant="body1" color="#fff">
              &copy; Copyright 2021. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
