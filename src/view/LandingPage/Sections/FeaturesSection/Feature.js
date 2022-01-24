import React from "react";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

function Feature({ title, description, image }) {
  return (
    <Grid item>
      <Card
        sx={{
          display: "flex",
          mb: 5,
          mx: 15,
        }}
        elevation={4}
      >
        <CardMedia
          sx={{
            minWidth: 280,
          }}
          image={image}
        ></CardMedia>
        <CardContent sx={{ px: 6, mt: 2 }}>
          <Typography variant="h5" paragraph>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 17 }} paragraph>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Feature;
