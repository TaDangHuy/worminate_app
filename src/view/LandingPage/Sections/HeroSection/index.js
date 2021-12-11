import React from "react";
import { Paper, Button, Container, Typography, Grid, Box } from "@mui/material";
import Home from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <Paper
      sx={{
        height: "100vh",
      }}
      elevation={24}
    >
      <Box
        component="img"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          filter: "opacity(60%)",
        }}
        src={require("../../../../assets/images/background.png").default}
      />
      <Container
        sx={{
          height: "100%",
          position: "relative",
        }}
        maxWidth="md"
      >
        <Grid
          sx={{
            height: "100%",
            paddingTop: "22vh",
          }}
          container
        >
          <Grid sm={8} item>
            <Typography variant="h3">Welcome to Worminate</Typography>
            <Typography variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              repellat!
            </Typography>
            <Box my={2}>
              <Button
                startIcon={<Home />}
                variant="contained"
                color="primary"
                size="large"
              >
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default HeroSection;
