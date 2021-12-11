import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function Main() {
  return (
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
  );
}

export default Main;