import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

function RightContent() {
  return (
    <Grid container spacing={2} sx={{ px: 4, py: 2.5 }}>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
    </Grid>
  );
}

export default RightContent;
