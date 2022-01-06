import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, index }) {
  return (
    <Link to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: 265, borderRadius: 3, height: 375 }} elevation={4}>
        <CardMedia
          component="img"
          sx={{ width: 265, height: 200 }}
          image={
            post.images.length > 0
              ? post.images[0].path === ""
                ? "https://onlinecrm.vn/media/default.jpg"
                : post.images[0].path
              : "https://onlinecrm.vn/media/default.jpg"
          }
        />
        <CardContent sx={{ height: 100, ml: 1 }}>
          <Typography
            variant="h6"
            color="textPrimary"
            noWrap
            sx={{ width: 213, fontWeight: "20px" }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            noWrap
            sx={{ width: 210, fontSize: 17 }}
          >
            {post.description}
          </Typography>
          <Box sx={{ mt: 1, mr: 1.5 }}>
            <Typography
              sx={{
                fontSize: "20px",
                display: "inline",
              }}
              variant="subtitle1"
              color="primary"
            >
              {post.price ? `$${post.price}` : post.price === 0 ? "$0" : "?"}
            </Typography>

            <Rating
              sx={{ float: "right" }}
              value={post.reviewsScore}
              readOnly
            />
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "right",
              mr: 2,
              mt: 1,
              fontSize: 17,
            }}
            noWrap
          >
            {post.location}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PostCard;
