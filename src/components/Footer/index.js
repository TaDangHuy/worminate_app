import React from "react";
import { Paper, Container, Typography, Grid, Box, Stack } from "@mui/material";
import {
  Facebook,
  LinkedIn,
  LocationOn,
  Mail,
  People,
  Language,
} from "@mui/icons-material";

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
      <Container maxWidth="lg">
        <Grid
          sx={{ height: "16vh", mt: 2 }}
          container
          //</Container>alignItems="center"
        >
          <Grid xs={4} item>
            <Stack direction="row" sx={{ ml: -2 }}>
              <Box
                component="img"
                sx={{
                  height: 46,
                  width: 41,
                  marginRight: 1,
                  marginLeft: 1,
                  marginTop: -1,
                }}
                src={require("../../assets/images/logo.png").default}
                alt="worminate-token"
              />
              <Typography variant="h6" color="#fff" sx={{ ml: 0.3 }}>
                Worminate
              </Typography>
            </Stack>
            <Typography variant="body1" color="#fff" sx={{ mt: 1 }}>
              <LocationOn sx={{ mb: 0.4, mr: 0.4 }} /> 01 Dai Co Viet, Hai Ba
              Trung, Ha Noi
            </Typography>
            <Typography svariant="body1" color="#fff" sx={{ mt: 1 }}>
              <Mail sx={{ mb: 0.3, mr: 0.4 }} /> tokyo.example@gmail.com
            </Typography>
          </Grid>

          <Grid xs={3} item sx={{ ml: 3 }}>
            <Typography variant="h6" color="#fff" sx={{ ml: 0.2 }}>
              Social Media
            </Typography>
            <Typography variant="body1" color="#fff" sx={{ mt: 1 }}>
              <Facebook sx={{ mb: 0.4, mr: 0.5 }} />
              Facebook
            </Typography>
            <Typography svariant="body1" color="#fff" sx={{ mt: 1 }}>
              <LinkedIn sx={{ mb: 0.4, mr: 0.5 }} />
              LinkedIn
            </Typography>
          </Grid>
          <Grid xs={2} item sx={{}}>
            <Typography variant="h6" color="#fff" sx={{ ml: 0.2 }}>
              About us
            </Typography>
            <Typography variant="body1" color="#fff" sx={{ mt: 1 }}>
              <People sx={{ mb: 0.4, mr: 0.5 }} />
              Our team
            </Typography>
            <Typography svariant="body1" color="#fff" sx={{ mt: 1 }}>
              <Language sx={{ mb: 0.4, mr: 0.5 }} />
              Our websites
            </Typography>
          </Grid>
          <Grid xs={2} item align="right" sx={{ ml: 8.8, mt: 4.6 }}>
            <Typography variant="h6" color="#fff">
              &copy; 2022 Worminate
            </Typography>
          </Grid>
          <Grid xs={6} item sx={{}}></Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
