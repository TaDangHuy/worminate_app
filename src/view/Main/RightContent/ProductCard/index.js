import {
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import React from "react";
import { Link } from "react-router-dom";

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

            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  textTransform: "none",
                  fontSize: 13,
                  bgcolor: "#6A983C",
                }}
                endIcon={<ArrowForwardIosIcon />}
              >
                <Link to="/detail" style={{ textDecoration: "none" }}>
                  Product Details
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  textTransform: "none",
                  fontSize: 13,
                  bgcolor: "#F5F5F5",
                  color: "black",
                }}
                startIcon={<FavoriteBorderIcon />}
              >
                Add to wish list
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductCard;
