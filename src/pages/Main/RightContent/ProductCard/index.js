import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import React from "react";

function ProductCard() {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="220"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="img"
            sx={{ bgcolor: "#F9F9F9" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              height: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography variant="subtitle1">Product Name</Typography>
              <Typography variant="subtitle2">Sub title</Typography>
            </div>

            <div style={{ height: 100 }}>
              <Typography variant="body1">Infomation or Detail</Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              height: "100%",
              p: 2,
              pr: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography variant="subtitle1">Price</Typography>
              <Typography variant="subtitle2">Old Price</Typography>
            </div>

            <div>
              <Typography variant="subtitle1">Some infomation</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  mb: 1,
                  fontSize: 13,
                  bgcolor: "#6A983C",
                }}
                endIcon={<ArrowForwardIosIcon />}
              >
                Product Details
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: 13,
                  bgcolor: "#F5F5F5",
                  color: "black",
                }}
                startIcon={<FavoriteBorderIcon />}
              >
                Add to wish list
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductCard;
