import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function PostCard({ post, id }) {
  return (
    <a
      href={`/posts/${post["_id"]}`}
      style={{
        textDecoration: "none",
        "&:hover": {
          backgroundColor: "#f5f8fb",
        },
      }}
    >
      <Card sx={{ maxWidth: 270 }}>
        <CardMedia
          component="img"
          sx={{ width: 270, height: 140 }}
          image={post.images.length > 0 ? post.images[0].path : ""}
          alt="post image"
        />
        <CardContent sx={{ height: 114 }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight="700"
          >
            {`Post #${id + 1}`}
          </Typography>
          <Typography variant="h6" color="textPrimary" noWrap>
            {post.title}
          </Typography>

          <Typography
            variant="subtitle1"
            paragraph
            color="text.secondary"
            noWrap
          >
            {post.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="space-around"
          >
            {/* <IconButton
            color="secondary"
            variant="outlined"
            component={Link}
            to={`/posts/${post["_id"]}`}
            sx={{
              "&:hover": { backgroundColor: "#f5f8fb" },
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton> */}
          </Stack>
        </CardActions>
      </Card>
    </a>
  );
}

export default PostCard;
