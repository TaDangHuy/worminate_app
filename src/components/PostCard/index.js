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
import { BiDollar } from "react-icons/bi";

function PostCard({ post }) {
  const price = Math.floor((post.price * 100) / 100);
  return (
    <a href={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: 225, borderRadius: 3, height: 330 }} elevation={3}>
        <CardMedia
          component="img"
          sx={{ width: 225, height: 170, objectFit: "cover" }}
          image={
            post.images.length > 0
              ? post.images[0].path === ""
                ? "https://onlinecrm.vn/media/default.jpg"
                : post.images[0].path
              : "https://onlinecrm.vn/media/default.jpg"
          }
        />
        <CardContent sx={{ height: 100, ml: 0.7 }}>
          <Typography
            variant="h6"
            color="textPrimary"
            noWrap
            sx={{ width: 165, fontSize: "20px", mb: 0.5, mt: -0.3 }}
          >
            {post.title}
          </Typography>
          <BiDollar
            size={22}
            color="#3b8767"
            style={{ margin: "0px -3px 7.3px -4px" }}
          />
          <Typography
            sx={{
              fontSize: "20px",
              display: "inline",
            }}
            variant="subtitle1"
            color="primary"
            noWrap
          >
            {post.price ? `${price}` : post.price === 0 ? "0" : "?"}
          </Typography>
          {/* <Typography
            variant="subtitle1"
            color="text.secondary"
            noWrap
            sx={{ width: 210, fontSize: 17 }}
          >
            {post.author.fullName}
          </Typography> */}
          <Box display="flex" justifyContent="right" sx={{ mr: 2, mt: 0.5 }}>
            <Rating value={post.reviewsScore} readOnly size="small" />
          </Box>

          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              mr: 2,
              mt: 1,
              fontWeight: 599,
            }}
            noWrap
          >
            {post.location}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}

export default PostCard;
