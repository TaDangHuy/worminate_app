import React, { useEffect, useState } from "react";
import { Paper, Button, Container, Typography, Grid, Box } from "@mui/material";
import Home from "@mui/icons-material/HomeRounded";
import { useHistory } from "react-router-dom";
import TypeAnimation from "react-type-animation";
import axios from "axios";

function HeroSection() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/user`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setIsAdmin(response.data.user.admin);
    });
  });

  const history = useHistory();
  return (
    <Paper
      sx={{
        height: "100vh",
      }}
      elevation={4}
    >
      <Box
        component="img"
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          position: "absolute",
          filter: "opacity(100%)",
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
          <Grid sm={8} sx={{ ml: 18, mt: 13 }} item>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                color: "white",
                //textShadow: "#fff 1px 1px",
              }}
            >
              Welcome to Worminate
            </Typography>
            <Box ml={2} sx={{ textAlign: "center", mt: 0.3 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  //textShadow: "#fff 1px 1px"
                }}
              >
                <TypeAnimation
                  cursor={true}
                  sequence={[
                    " Everything you want is right here ! Suprise 🥳",
                    2000,
                    " Have a nice day 🤟",
                    2000,
                    " What are you looking for ? 👀",
                    2000,
                    " Click me 👇",
                    2000,
                  ]}
                  wrapper="h4"
                  // repeat={1}
                />
              </Typography>
            </Box>
            <Box my={2} sx={{ textAlign: "center" }}>
              <Button
                startIcon={<Home sx={{ mb: 0.5 }} />}
                variant="contained"
                color="primary"
                sx={{ pt: 1.1 }}
                onClick={() => {
                  isAdmin ? history.push("/admin") : history.push("/home");
                }}
              >
                Home
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default HeroSection;
