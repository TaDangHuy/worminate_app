import {
  Breadcrumbs,
  Box,
  Grid,
  Link,
  Typography,
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";

function Detail() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Header />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/home">
          Homepage
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Fruit and Vegetables
        </Link>
        <Typography color="text.primary">Carrots form xxx</Typography>
      </Breadcrumbs>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={5}
            sx={{ height: "100vh", border: 1, borderColor: "primary.main" }}
          >
            image
          </Grid>
          <Grid item xs={5}>
            <Card sx={{ maxWidth: 700 }}>
              <CardHeader
                title="Carrots from Tomissy Farm"
                subheader="star compo"
              />
              <CardContent>
                <Typography variant="body2">
                  Carrots from Tomissy Farm are one of the best on the market.
                  Tomisso and his family are giving a full love to his Bio
                  products. Tomisso’s carrots are growing on the fields
                  naturally.
                </Typography>
                <Box
                  sx={{
                    height: 150,
                    border: 1,
                    borderColor: "primary.main",
                    mt: 5,
                  }}
                >
                  infomation
                </Box>
              </CardContent>
              <CardActions>
                <Grid container direction="column">
                  <Grid item sx={{ mb: 3 }}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <ListItemText primary="36,23 USD" secondary="40 USD" />
                      </Grid>
                      <Grid item>
                        <Stack direction="row" spacing={2}>
                          <Button variant="contained">Price</Button>
                          <Button variant="contained">Add to favorites</Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>Add to my wish list , company</Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Detail;
