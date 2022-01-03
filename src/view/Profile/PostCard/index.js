import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function PostCard({ post, id }) {
  return (
    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        component="img"
        sx={{ width: 270, height: 140 }}
        image={post.images.length > 0 ? post.images[0].path : ""}
        alt="post image"
      />
      <CardContent sx={{ height: 114 }}>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="700">
          {`Post #${id + 1}`}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          {post.title}
        </Typography>

        <Typography variant="subtitle1" paragraph color="text.secondary" noWrap>
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{
            width: 140,
            height: 36,
            borderRadius: "20px",
            "&:hover": { backgroundColor: "rgb(230,255,250)" },
          }}
        >
          View Post
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
