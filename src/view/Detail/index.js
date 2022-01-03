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
  CssBaseline,
  Paper,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@mui/styles";
import React from "react";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPost } from "../../features/posts/postSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#FFFF",

    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  big_title: {
    textTransform: "capitalize",
    fontWeight: "400",
  },
  item_image: {
    height: 150,
    width: 100,
  },
});

function Detail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostQuery(useLocation().pathname);
  const images = !isLoading && data.post.images ? data.post.images : [];

  useEffect(() => {
    if (data) dispatch(setPost(data.post));
    //eslint-disable-next-line
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "rgb(247,250,252)",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Header />
      <Box
        className={classes.container}
        sx={{ mt: 11, mb: 1.5, mx: 10, p: 2, pt: 3.5 }}
      >
        <Typography
          className={classes.big_title}
          variant="h5"
          sx={{ mb: "20px" }}
        >
          Product details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={5}
              sx={{
                height: "10%",
              }}
            >
              <Carousel
                PrevIcon={<ArrowBackIosIcon sx={{ color: "#fff" }} />}
                NextIcon={<ArrowForwardIosIcon sx={{ color: "#fff" }} />}
              >
                {images.map((image, i) => (
                  <Box
                    component="img"
                    src={image.path}
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ))}
              </Carousel>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 700 }} elevation={5}>
              <CardHeader
                title={
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {isLoading ? "Loading..." : data.post.title}
                  </Typography>
                }
                subheader={
                  !isLoading && (
                    <Rating
                      name="read-only"
                      value={data.post.avgRating}
                      readOnly
                      size="large"
                    />
                  )
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
                  {isLoading ? "Loading..." : `$${data.post.price}`}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: "rgb(170,183,199)", fontSize: 20, mt: 4 }}
                >
                  Author
                </Typography>
                <Typography>
                  {isLoading ? "Loading..." : data.post.author.fullName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
                >
                  Location
                </Typography>
                <Typography>
                  {isLoading ? "Loading..." : data.post.location}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
                >
                  Description
                </Typography>

                <Typography>
                  {isLoading ? "Loading..." : data.post.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ mb: 1, ml: 1 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Add to favorites
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
            <ImageList
              sx={{ width: "100%", height: 150, mt: 2 }}
              cols={5}
              rowHeight={64}
              gap={20}
            >
              {images.map((image, i) => (
                <Paper elevation={5}>
                  <ImageListItem>
                    <img
                      className={classes.item_image}
                      src={image.path}
                      alt="{item.title}"
                    />
                  </ImageListItem>
                </Paper>
              ))}
            </ImageList>
          </Grid>
        </Grid>
        {/* <Box sx={{ width: "100%", height: 300, border: "0px solid" }}>
          Phan va cac san phan lien quan (de xuat)
        </Box> */}
      </Box>
    </Box>
    //
  );
}

export default Detail;
