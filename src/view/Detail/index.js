import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ImageList,
  ImageListItem,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  big_title: {
    textTransform: "capitalize",
    fontWeight: "400",
  },
  big_image: {
    width: "600px",
    height: "500px",
  },
  item_image: {
    borderRadius: "30px",
  },
});

function Detail() {
  const classes = useStyles();
  return (
    <Box className={classes.container} sx={{ mt: 2, mx: 10, p: 2, pt: 3.5 }}>
      <Typography
        className={classes.big_title}
        variant="h5"
        sx={{ mb: "50px" }}
      >
        Product details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box className={classes.big_image} sx={{ m: "auto", mb: "70px" }}>
            <img
              src="https://demos.creative-tim.com/purity-ui-dashboard-pro/static/media/product-page-1.34b20db8.png"
              alt="{item.title}"
              loading="lazy"
            />
          </Box>
          <ImageList
            sx={{ width: 500, height: 150, m: "auto" }}
            cols={4}
            rowHeight={64}
            gap={20}
          >
            <ImageListItem>
              <img
                className={classes.item_image}
                src="https://demos.creative-tim.com/purity-ui-dashboard-pro/static/media/product-page-3.98f1599f.png"
                alt="{item.title}"
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                className={classes.item_image}
                src="https://demos.creative-tim.com/purity-ui-dashboard-pro/static/media/product-page-2.db82b35b.png"
                alt="{item.title}"
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                className={classes.item_image}
                src="https://demos.creative-tim.com/purity-ui-dashboard-pro/static/media/product-page-5.5f13044c.png"
                alt="{item.title}"
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                className={classes.item_image}
                src="https://demos.creative-tim.com/purity-ui-dashboard-pro/static/media/product-page-5.5f13044c.png"
                alt="{item.title}"
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ maxWidth: 700, border: "none" }}>
            <CardHeader
              title={<Typography variant="h4">Modern Luxury Sofa</Typography>}
              subheader={
                <Rating name="read-only" value={4} readOnly size="large" />
              }
            />
            <CardContent>
              <Typography
                variant="body1"
                sx={{ color: "rgb(170,183,199)", fontSize: 20 }}
              >
                Price
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "500" }}>
                $2,599.00
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
              >
                Description
              </Typography>

              <ul>
                <li style={{ fontSize: "20px", marginBottom: "20px" }}>
                  The most beautiful curves of this swivel stool adds an elegant
                  touch to any environment
                </li>
                <li style={{ fontSize: "20px", marginBottom: "20px" }}>
                  Memory swivel seat returns to original seat position
                </li>
                <li style={{ fontSize: "20px", marginBottom: "20px" }}>
                  Comfortable integrated layered chair seat cushion design
                </li>
                <li style={{ fontSize: "20px", marginBottom: "20px" }}>
                  Fully assembled! No assembly required
                </li>
              </ul>
            </CardContent>
            <CardActions>
              <Grid container direction="column">
                <Grid item>
                  <Button
                    sx={{
                      width: 240,
                      height: 50,
                      borderRadius: "10px",
                    }}
                    variant="contained"
                    color="success"
                  >
                    Add to favorites
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", height: 300, border: "1px solid" }}>
        Phan va cac san phan lien quan (de xuat)
      </Box>
    </Box>
  );
}

export default Detail;
