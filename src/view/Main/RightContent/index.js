import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./ProductCard";
import { Scrollbars } from "react-custom-scrollbars";

function RightContent() {
  return (
    <Box sx={{ px: 4, py: 2.5, height: 800 }}>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
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
      </Scrollbars>
    </Box>
  );
}

export default RightContent;
