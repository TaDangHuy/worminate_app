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
          filter: "opacity(90%)",
        }}
        src={require("../../../../assets/images/background.jpg").default}
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
            paddingTop: "18vh",
          }}
          container
        >
          <Grid sm={8} sx={{ ml: 20, mt: 6 }} item>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                textShadow: "#fff 1px 1px",
              }}
            >
              Welcome to Worminate
            </Typography>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", textShadow: "#fff 1px 1px" }}
            >
              Everything you want is right here
            </Typography>
            <Box my={2} sx={{ textAlign: "center" }}>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  startIcon={<Home />}
                  variant="contained"
                  color="primary"
                  // size="large"
                >
                  Home
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default HeroSection;
