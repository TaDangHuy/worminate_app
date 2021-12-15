import React from "react";
import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import Feature from "./Feature";

import FeatureImage1 from "../../../../assets/images/features/feature-1.jpg";
import FeatureImage2 from "../../../../assets/images/features/feature-2.jpg";
import FeatureImage3 from "../../../../assets/images/features/feature-3.jpg";
import FeatureImage4 from "../../../../assets/images/features/feature-4.jpg";

function FeaturesSection() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Paper elevation={24}>
        <Box pt={5} mt={5} mb={4} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Features</Typography>
        </Box>
        <Grid container>
          {featureItems.map((item, i) => (
            <Feature {...item} key={i} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

const featureItems = [
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur tempora esse deserunt quam consequuntur odio, eum iure recusandae ut distinctio",
    imageAlt: "feature-1",
    image: FeatureImage1,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur tempora esse deserunt quam consequuntur odio, eum iure recusandae ut distinctio",
    imageAlt: "feature-2",
    image: FeatureImage2,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur tempora esse deserunt quam consequuntur odio, eum iure recusandae ut distinctio",
    imageAlt: "feature-3",
    image: FeatureImage3,
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur tempora esse deserunt quam consequuntur odio, eum iure recusandae ut distinctio",
    imageAlt: "feature-4",
    image: FeatureImage4,
  },
];

export default FeaturesSection;
