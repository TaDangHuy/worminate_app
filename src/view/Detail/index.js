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
  Skeleton,
  Container,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPost } from "../../features/posts/postSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
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
  const [isHeartClicked, setIsHeartClicked] = useState(false);
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
      <Container maxWidth="lg">
        <Box
          className={classes.container}
          sx={{ mt: 11, mb: 1.5, mx: 10, p: 2, pt: 3, borderRadius: 3 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "17.5%",
              left: "15%",
            }}
          >
            <Button
              variant="text"
              color="primary"
              startIcon={<ArrowBackIosIcon />}
            >
              <Link
                to="/main"
                style={{ textDecoration: "none", color: "#009688" }}
              >
                Back
              </Link>
            </Button>
          </Box>
          <Typography
            className={classes.big_title}
            variant="h5"
            sx={{ mb: "20px", textAlign: "center" }}
          >
            Product details
          </Typography>
          <Box
            sx={{
              position: "absolute",
              top: "25.2%",
              left: "78%",
            }}
          >
            <Heart
              isClick={isHeartClicked}
              onClick={() => setIsHeartClicked(!isHeartClicked)}
            />
          </Box>
          <Grid container spacing={2} sx={{ borderRadius: 3 }}>
            <Grid item xs={6}>
              {isLoading ? (
                <Skeleton variant="retangular" height="320px" />
              ) : (
                <Carousel>
                  {images.map((image, i) => (
                    <Box
                      component="img"
                      src={
                        "https://i2.wp.com/tumusiimerobert.com/wp-content/uploads/2021/11/faster-computer.jpg?w=1000"
                      }
                      sx={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  ))}
                </Carousel>
              )}

              {/* <ImageList
              sx={{ width: "100%", height: 150, mt: 2 }}
              cols={5}
              rowHeight={64}
              gap={20}
            > */}
              <ImageList sx={{ height: "200px" }}>
                {images.map((image, i) => (
                  <Paper elevation={5}>
                    <ImageListItem>
                      <img
                        className={classes.item_image}
                        src={
                          "https://i2.wp.com/tumusiimerobert.com/wp-content/uploads/2021/11/faster-computer.jpg?w=1000"
                        }
                        alt="{item.title}"
                      />
                    </ImageListItem>
                  </Paper>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 700, pl: 2 }} elevation={5}>
                <CardHeader
                  title={
                    isLoading ? (
                      <Skeleton variant="text" width="350px" />
                    ) : (
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {data.post.title}
                      </Typography>
                    )
                  }
                  subheader={
                    isLoading ? (
                      <Skeleton variant="text" width="180px" />
                    ) : (
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

                  {isLoading ? (
                    <Skeleton variant="text" width="350px" />
                  ) : (
                    <Typography variant="h4" sx={{ fontWeight: "500" }}>
                      {`\$${data.post.price}`}
                    </Typography>
                  )}

                  <Typography
                    variant="body1"
                    sx={{ color: "rgb(170,183,199)", fontSize: 20, mt: 4 }}
                  >
                    Author
                  </Typography>

                  {isLoading ? (
                    <Skeleton variant="text" width="350px" />
                  ) : (
                    <Typography>{data.post.author.fullName}</Typography>
                  )}

                  <Typography
                    variant="body1"
                    sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
                  >
                    Location
                  </Typography>

                  {isLoading ? (
                    <Skeleton variant="text" width="350px" />
                  ) : (
                    <Typography>{data.post.location} </Typography>
                  )}

                  <Typography
                    variant="body1"
                    sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
                  >
                    Description
                  </Typography>

                  {isLoading ? (
                    <Skeleton
                      variant="retangular"
                      height="100px"
                      width="350px"
                    />
                  ) : (
                    <Typography>{data.post.description}</Typography>
                  )}
                </CardContent>
                <CardActions sx={{ mb: 1, ml: 1 }}>
                  <Grid container direction="column">
                    <Grid item></Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {/* <Box sx={{ width: "100%", height: 300, border: "0px solid" }}>
          Phan va cac san phan lien quan (de xuat)
        </Box> */}
        </Box>
      </Container>
    </Box>
  );
}

export default Detail;
