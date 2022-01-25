import React from "react";
import { Container, Grid, Typography, Box, Button, Paper } from "@mui/material";
import { keyframes } from "@mui/system";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

function TokenSection() {
  const move = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(28px);
  }
`;

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ pb: 5, borderRadius: 3 }}>
        <Box pt={5} mb={5} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Token</Typography>
        </Box>
        <Grid container spacing={2} sx={{ ml: 6 }}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid xs={12} item sx={{ mb: 0 }}>
                <Paper elevation={4} sx={{ py: 4.5, px: 3 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Worminate Token ICO
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 17 }}>
                    Worminate transforms access to blockchain technology and
                    enables it to be widely used in real economy. You can use
                    our token on our shopping website to purchase promotional
                    plans, making your products become more outstanding from
                    others! During the token sale period we are offering WOR
                    tokens with founder privileges 🌟
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.7 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    ERC 20 standard token
                  </Typography>
                  <Typography variant="body1">
                    Fully compliant ERC20 token
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Start date
                  </Typography>
                  <Typography variant="body1">
                    January 15th, 12:00 UTC
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Currencies accepted
                  </Typography>
                  <Typography variant="body1">ETH</Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    End date
                  </Typography>
                  <Typography variant="body1">March 15th, 12:00 UTC</Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Total supply
                  </Typography>
                  <Typography variant="body1">100,000,000 WOR</Typography>
                </Paper>
              </Grid>
              <Grid xs={6} item>
                <Paper elevation={4} sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Soft cap
                  </Typography>
                  <Typography variant="body1">10,000 ETH</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container align="center">
              <Paper elevation={4} sx={{ p: 3 }}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    sx={{
                      height: 410,
                      width: 410,
                      p: 7,
                      mt: -6.6,
                      animation: `${move} 2s infinite alternate`,
                    }}
                    src={require("../../../../assets/images/token.png").default}
                    alt="worminate-token"
                  />
                </Grid>{" "}
                <Grid item xs={12} mt={-1.5}>
                  <Typography variant="h5">ICO ends in:</Typography>
                  <Typography variant="h3">
                    <Countdown date={new Date(2022, 3, 15)} />
                  </Typography>
                  <Box sx={{ mt: -1.5 }}>
                    <Typography sx={{ ml: 0 }} variant="body1" component="span">
                      day
                    </Typography>
                    <Typography sx={{ ml: 2 }} variant="body1" component="span">
                      hour
                    </Typography>
                    <Typography sx={{ ml: 2 }} variant="body1" component="span">
                      min
                    </Typography>
                    <Typography sx={{ ml: 2 }} variant="body1" component="span">
                      sec
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Link to="/token">
                      <Button variant="contained" size="large" color="primary">
                        Buy now
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TokenSection;
