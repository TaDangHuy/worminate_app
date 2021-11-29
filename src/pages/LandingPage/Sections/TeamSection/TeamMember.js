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
        variant="outlined"
      >
        <CardMedia
          sx={{
            width: 250,
            height: 225,
          }}
          image={image}
        ></CardMedia>
        <CardContent
          sx={{
            mt: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{job}</Typography>
        </CardContent>
        <CardActions>
          <SocialLinks socialLinks={socialLinks} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TeamMember;
