import React from "react";
import { Container, Grid, Typography, Box, Button, Paper } from "@mui/material";

function TokenSection() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Paper elevation={24} sx={{ paddingBottom: 5, paddingX: 5 }}>
        <Box pt={5} mb={5} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Token</Typography>
        </Box>
        <Grid container spacing={20}>
          <Grid sm={12} md={4} item>
            <Box
              component="img"
              sx={{
                height: 250,
                width: 250,
                marginLeft: 6,
              }}
              src={require("../../../../assets/images/token.png").default}
              alt="worminate-token"
            />
          </Grid>
          <Grid sm={12} md={7} item>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Our Worminate Token
            </Typography>
            <Typography variant="subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              consectetur non maiores adipisci culpa reiciendis? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Sint natus ratione
              vel atque magnam officia accusamus autem doloribus quis ut. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Molestias rem
              optio minima in, atque unde quasi.
            </Typography>
            <Box my={3}>
              <Button variant="contained" size="large" color="primary">
                Buy now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TokenSection;
