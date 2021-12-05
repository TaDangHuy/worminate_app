import { Grid, ListItemText, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
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
        <Grid item sx={{ height: "635px" }}>
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <Grid container>
              <Grid item xs={12} mb={2}>
                <ProductCard />
              </Grid>
              <Grid item xs={12} mb={2}>
                <ProductCard />
              </Grid>
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
          </Scrollbars>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeftContent;
