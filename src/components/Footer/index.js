import React from "react";
import { Paper, Container, Typography, Grid } from "@mui/material";

function Footer() {
  return (
    <Paper elevation={24} sx={{ mt: 4 }}>
      <Container maxWidth="md">
        <Grid sx={{ height: "16vh" }} container alignItems="center">
          <Grid sm={7} item sx={{ ml: -16.5 }}>
            <Typography>
              Address : 01 Dai Co Viet, Hai Ba Trung, Ha Noi
            </Typography>
            <Typography>Email : tokyo@example.com</Typography>
          </Grid>
          <Grid sm={5} item sx={{ ml: 7.5 }}>
            <Typography>&copy; Copyright 2021. All Rights Reserved.</Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
