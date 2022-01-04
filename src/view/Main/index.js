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
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function Main() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          bgcolor: "rgb(247,250,252)",
          flexDirection: "column",
          mt: 12,
        }}
      >
        <CssBaseline />
        <Header />

        <Box sx={{ width: "100%", height: "100%" }}>
          <Grid container>
            <Grid item xs={3}>
              <LeftContent />
            </Grid>
            <Grid item xs={9}>
              <RightContent />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Main;
