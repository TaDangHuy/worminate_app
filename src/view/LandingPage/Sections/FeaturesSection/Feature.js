import React from "react";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

function Feature({ title, description, image }) {
  return (
    <Grid item>
      <Card
        sx={{
          display: "flex",
          mb: 5,
          marginX: 5,
        }}
        variant="outlined"
      >
        <CardMedia
          sx={{
            width: 200,
          }}
          image={image}
        ></CardMedia>
        <CardContent>
          <Typography variant="h6" paragraph>
            {title}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Feature;
