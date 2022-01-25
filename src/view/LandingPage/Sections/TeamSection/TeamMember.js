import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import SocialLinks from "./SocialLinks";

function TeamMember({ image, name, job, socialLinks }) {
  return (
    <Grid item sm={3}>
      <Card
        sx={{
          mb: 3,
          mx: 3,
        }}
        elevation={4}
      >
        <CardMedia
          sx={{
            width: "100%",
            height: 240,
            pt: 2,
          }}
          image={image}
        ></CardMedia>
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{job}</Typography>
        </CardContent>
        <CardActions>
          <SocialLinks socialLinks={socialLinks} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TeamMember;
