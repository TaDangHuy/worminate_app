import { CssBaseline, Grid, Container } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import StickyBox from "react-sticky-box";

function Main() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", height: "100%" }}>
          <Grid container>
            <Grid item xs={3} display="flex" alignItems="flex-start">
              <StickyBox>
                <LeftContent />
              </StickyBox>
            </Grid>
            <Grid item xs={9}>
              <RightContent />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Main;
