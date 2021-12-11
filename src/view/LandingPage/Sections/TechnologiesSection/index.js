import React from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";

export default function TechnologiesSection() {
  return (
    <Container maxWidth="lg" sx={{ marginY: 10 }}>
      <Paper elevation={24}>
        <Box pt={5} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Technologies</Typography>
        </Box>
        <Grid container sx={{ padding: 5, marginLeft: 5 }}>
          <Grid item sm={3}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
              }}
              src={require("../../../../assets/images/logo.png").default}
              alt="worminate-token"
            />
          </Grid>
          <Grid item sm={3}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
              }}
              src={require("../../../../assets/images/logo.png").default}
              alt="worminate-token"
            />
          </Grid>
          <Grid item sm={3}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
              }}
              src={require("../../../../assets/images/logo.png").default}
              alt="worminate-token"
            />
          </Grid>
          <Grid item sm={3}>
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
              }}
              src={require("../../../../assets/images/logo.png").default}
              alt="worminate-token"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
