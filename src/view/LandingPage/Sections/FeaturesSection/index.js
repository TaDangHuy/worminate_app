import React from "react";
import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import Feature from "./Feature";

import FeatureImage1 from "../../../../assets/images/features/feature-1.png";
import FeatureImage2 from "../../../../assets/images/features/feature-2.jpg";
import FeatureImage3 from "../../../../assets/images/features/feature-3.jpg";
// import FeatureImage4 from "../../../../assets/images/features/feature-4.jpg";

function FeaturesSection() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, pb: 3 }}>
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
    title: "Top products",
    description:
      "View top products at ease, around your place and even overseas! Their qualities are judged by a lot of criteria, just because we want to serve you with the best 👌",
    imageAlt: "feature-1",
    image: FeatureImage1,
  },
  {
    title: "Enjoy your shopping",
    description:
      "Search what you like, buy what you want. Contact with the seller for more information and feel free to bargain 🤝",
    imageAlt: "feature-2",
    image: FeatureImage2,
  },
  {
    title: "Become a seller",
    description:
      "Do you want to sell some second-hand items? Do you have a shop and really want to move your business online and expand your reach? If the answer is yes, then you are in the right place! You can even promote your products by using our token, see the next section for more information 👇",
    imageAlt: "feature-3",
    image: FeatureImage3,
  },
  // {
  //   title: "Lorem ipsum dolor sit amet consectetur",
  //   description:
  //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur tempora esse deserunt quam consequuntur odio, eum iure recusandae ut distinctio",
  //   imageAlt: "feature-4",
  //   image: FeatureImage4,
  // },
];

export default FeaturesSection;
