import React from "react";
import { Paper, Container, Typography, Grid } from "@mui/material";

function Footer() {
  return (
    <Paper elevation={24}>
      <Container maxWidth="md">
        <Grid sx={{ height: "16vh" }} container alignItems="center">
          <Grid sm={7} item>
            <Typography>Address : xxx</Typography>
            <Typography>Email : 123abc@gmail.com</Typography>
          </Grid>
          <Grid sm={5} item>
            <Typography>&copy; Copyright 2021. All Rights Reserved.</Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
