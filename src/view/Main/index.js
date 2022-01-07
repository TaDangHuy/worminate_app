import {
  Breadcrumbs,
  CssBaseline,
  Grid,
  Link,
  Typography,
  Container,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function Main() {
  return (
    <Box
    // sx={{
    //   mt: 10.5,
    // }}
    >
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", height: "100%", mb: 9 }}>
          <Grid container>
            <Grid item xs={3}>
              <LeftContent />
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
