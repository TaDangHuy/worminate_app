import { Grid, ListItemText, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./ProductCart";

function LeftContent() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <ListItemText
                primary="Apartments in New York"
                secondary="1248 results -Jan 9, 2014"
              />
            </Grid>
            <Grid item>
              <ListItemText primary="Wi-Fi" />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby": "switch-list-label-wifi",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item mb={2}>
          <Grid container justifyContent="space-between">
            <Grid item>price, Apartment, Floor, More</Grid>
            <Grid item>icon, sort by</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column>" overflow="hidden">
            <Grid item xs={12} mb={2}>
              <ProductCard />
            </Grid>
            <Grid item xs={12} mb={2}>
              <ProductCard />
            </Grid>
            <Grid item xs={12} mb={2}>
              <ProductCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeftContent;
