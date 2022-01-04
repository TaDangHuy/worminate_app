import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  Card,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Star, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";

import Heart from "react-animated-heart";

function ProductCard({ index, isLoading }) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const post = useSelector((state) => state.posts.value[index]) ?? [];

  return (
    <Card elevation={5} sx={{ borderRadius: 3, mx: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {isLoading ? (
            <Skeleton
              variant="retangular"
              height="220px"
              sx={{ m: 1, borderRadius: 3 }}
            />
          ) : (
            <CardMedia
              component="img"
              height="220"
              image={
                !isLoading && post.images
                  ? "https://i2.wp.com/tumusiimerobert.com/wp-content/uploads/2021/11/faster-computer.jpg?w=1000"
                  : ""
              }
              alt="img"
              sx={{ bgcolor: "#F9F9F9", m: 1, borderRadius: 3 }}
            />
          )}
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
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography variant="subtitle1">{post.title}</Typography>
              )}

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

            <div style={{ height: 150 }}>
              {isLoading ? (
                <Skeleton variant="retangular" height="150px" />
              ) : (
                <Typography variant="body1">{post.description}</Typography>
              )}
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
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography
                  sx={{ display: "inline", fontSize: "20px" }}
                  variant="subtitle1"
                >{`\$${post.price}`}</Typography>
              )}
            </div>

            <div>
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography variant="subtitle1">{post.location} </Typography>
              )}
            </div>

            <Stack direction="row" spacing={0} sx={{}}>
              <IconButton
                size="large"
                sx={{
                  height: "46px",
                  width: "46px",
                  mt: "24px",
                }}
              >
                <Link to={`/posts/${post._id}`} style={{ color: "#aab8c2" }}>
                  <Visibility
                    fontSize="inherit"
                    sx={{
                      ":hover": {
                        color: "primary.main",
                      },
                    }}
                  />
                </Link>
              </IconButton>

              <Heart
                isClick={isHeartClicked}
                onClick={() => setIsHeartClicked(!isHeartClicked)}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProductCard;
