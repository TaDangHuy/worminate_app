import * as React from "react";
import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import Header from "./Header";

function Home() {
  return (
    <Container sx={{ mt: 3 }}>
      <Box xs={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          endavbleColorDark
          position="static"
          color="inherit"
          elevation={1}
          sx={{ bgcolor: "#fff", mb: 2 }}
        >
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={5}>
            <LeftContent />
          </Grid>
          <Grid item xs={7}>
            <RightContent />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
