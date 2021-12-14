import {
  Breadcrumbs,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Header from "../../components/Header";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function Main() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "rgb(247,250,252)",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Header />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/main">
          Homepage
        </Link>
        <Link underline="hover" color="inherit" href="/main">
          Fruit and vegetables
        </Link>
      </Breadcrumbs>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: 70,
            bgcolor: "secondary.main",
            mb: 0.5,
          }}
        >
          <Typography variant="h5">Category</Typography>
          <Typography variant="h5">Grid view , list view </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 40,
            bgcolor: "secondary.main",
          }}
        >
          <Typography variant="h5">Selected filter</Typography>
        </Box>
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
    //
  );
}

export default Main;
