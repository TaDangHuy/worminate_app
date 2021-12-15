import React from "react";
import { Link } from "react-router-dom";
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
import Star from "@mui/icons-material/Star";
import AttachMoney from "@mui/icons-material/AttachMoney";
import { useSelector } from "react-redux";

function ProductCard({ index, isLoading }) {
  const post = useSelector((state) => state.posts.value[index]) ?? [];
  const images = isLoading ? [{ path: "", _id: "" }] : post.images;

  return (
    <Card>
      {console.log(images)}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="220"
            imageUrl=""
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
              <Typography variant="subtitle1">
                {isLoading ? "Loading..." : post.title}
              </Typography>
              <Typography
                sx={{ display: "inline", fontSize: "18px" }}
                variant="subtitle2"
              >
                {/* {isLoading ? "Loading..." : post.avgRating} */}
              </Typography>
              {/* {!isLoading && (
                <Star sx={{ color: "orange", display: "inline", pt: "8px" }} />
              )} */}
            </div>

            <div style={{ height: 100 }}>
              <Typography variant="body1">
                {isLoading ? "Loading..." : post.description}
              </Typography>
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
              <Typography
                sx={{ display: "inline", fontSize: "20px" }}
                variant="subtitle1"
              >
                {isLoading ? "Loading..." : post.price}
              </Typography>
              {!isLoading && (
                <AttachMoney sx={{ display: "inline", pt: "8px" }} />
              )}
            </div>

            <div>
              <Typography variant="subtitle1">
                {isLoading ? "Loading..." : post.location}
              </Typography>
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
                <Link
                  to="/post/:idPost"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
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
