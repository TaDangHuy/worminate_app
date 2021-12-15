import * as React from "react";
import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import Header from "../../components/Header";

function Home() {
  return (
    <Box xs={{ display: "flex" }} sx={{ mt: 10 }}>
      <CssBaseline />
      <Header />
      <Grid container>
        <Grid item xs={6}>
          <LeftContent />
        </Grid>
        <Grid item xs={6}>
          <RightContent />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
