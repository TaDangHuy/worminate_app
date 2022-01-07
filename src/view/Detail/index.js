import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  CssBaseline,
  Paper,
  Skeleton,
  Container,
  IconButton,
} from "@mui/material";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPost } from "../../features/posts/postSlice";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import MapIcon from "@mui/icons-material/Map";
import Add from "@mui/icons-material/Add";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
import Map from "../../components/Map";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Detail() {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostQuery(useLocation().pathname);
  const images = data ? data.post.images : [];
  const [image, setImage] = useState("https://onlinecrm.vn/media/default.jpg");

  useEffect(() => {
    if (data && data.post.images.length > 0) {
      setImage(data.post.images[0].path);
      // dispatch(setPost(data.post));
    }
    //eslint-disable-next-line
  }, [data]);

  const [sliderRef, setSliderRef] = useState(null);
  const settings = { slidesToShow: 3 };

  return (
    <Box>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Paper
          sx={{
            mt: 11,
            mb: 5,
            ml: 1.5,
            px: 2,
            pt: 3,
            pb: 5,
            borderRadius: 3,
          }}
          elevation={8}
        >
          <Grid container>
            <Grid item xs={1}>
              <Box sx={{ mt: -1.7 }}>
                <Link to="/main">
                  <IconButton>
                    <ArrowBackIos
                      sx={{
                        ":hover": {
                          color: "primary.main",
                        },
                      }}
                    />
                  </IconButton>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={11} sx={{ ml: -4.4, mt: -1.4, pb: 2.2 }}>
              <Typography variant="h5">Product Details</Typography>
            </Grid>
            <Grid item xs={6}>
              {isLoading ? (
                <Box
                  sx={{
                    ml: 7,
                    mt: -1,
                    width: 460,
                  }}
                >
                  <Skeleton
                    variant="retangular"
                    height="460px"
                    style={{ borderRadius: 3 }}
                  />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={image}
                  sx={{
                    ml: 7,
                    mt: -1,
                    width: 460,
                    height: 460,
                    borderRadius: 3,
                    boxShadow:
                      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {isLoading ? (
                <Box
                  sx={{
                    pb: 0.5,
                    position: "relative",
                    top: "-1.6%",
                    left: "3%",
                    width: 460,
                    borderRadius: 3,
                  }}
                >
                  <Skeleton variant="retangular" height="460px" />
                </Box>
              ) : (
                <Box
                  sx={{
                    pb: 0.5,
                    position: "relative",
                    top: "-1.6%",
                    left: "3%",
                    width: 530,
                  }}
                >
                  <Map
                    posts={[data.post]}
                    location={data.post.geometry.coordinates}
                    height="460px"
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              {isLoading ? (
                <Skeleton
                  variant="retangular"
                  width="460px"
                  height="100px"
                  sx={{ ml: 7, my: 2 }}
                />
              ) : (
                <Grid container sx={{ px: 6, ml: 0.6, mt: 1 }}>
                  <Grid item xs={1} sx={{ mt: 4.2 }}>
                    <IconButton
                      sx={{
                        ":hover": {
                          color: "primary.main",
                        },
                      }}
                      onClick={sliderRef?.slickPrev}
                    >
                      <ArrowBackIos />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box sx={{}}>
                      <Slider ref={setSliderRef} {...settings}>
                        {images.map((image, i) => (
                          <Box
                            sx={{
                              width: 100,
                              height: 117,
                              p: 1,
                              borderRadius: 4,
                            }}
                            component="img"
                            src={image.path}
                            alt=""
                            onClick={() => setImage(image.path)}
                          />
                        ))}
                      </Slider>
                    </Box>
                  </Grid>
                  <Grid item xs={1} sx={{ mt: 4.2 }}>
                    <IconButton
                      sx={{
                        ":hover": {
                          color: "primary.main",
                        },
                      }}
                      onClick={sliderRef?.slickNext}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={3} sx={{ pl: 2.2, mt: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
              >
                Location
              </Typography>

              {isLoading ? (
                <Skeleton variant="text" width="200px" />
              ) : (
                <>
                  <Typography>{data.post.location} </Typography>
                  <a
                    href={`https://www.google.com/maps/search/${data.post.location}/${data.post.geometry.coordinates[1]},${data.post.geometry.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <Button
                      startIcon={<MapIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Google map
                    </Button>
                  </a>
                </>
              )}
            </Grid>
            <Grid item xs={3} sx={{ pl: 2.5, mt: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
              >
                Author
              </Typography>
              {isLoading ? (
                <Skeleton variant="text" width="178px" />
              ) : (
                <>
                  <Typography>{data.post.author.fullName}</Typography>

                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Follow
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mx: 7, mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{}}>
                  {isLoading ? (
                    <Skeleton
                      variant="retangular"
                      width="975px"
                      height="100px"
                    />
                  ) : (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {data.post.title}
                    </Typography>
                  )}
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      width="200px"
                      height="50px"
                      sx={{ mb: 13 }}
                    />
                  ) : (
                    <>
                      <Box
                        sx={{
                          position: "relative",
                          top: "4%",
                          left: "0%",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={data.post.avgRating}
                          readOnly
                          size="large"
                        />
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          top: "-32.5%",
                          left: "22%",
                        }}
                      >
                        <Heart
                          isClick={isHeartClicked}
                          onClick={() => setIsHeartClicked(!isHeartClicked)}
                        />
                      </Box>
                    </>
                  )}
                </Grid>
                <Grid item xs={6} sx={{ mt: -13 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgb(170,183,199)", fontSize: 20 }}
                  >
                    Price
                  </Typography>
                  {isLoading ? (
                    <Skeleton variant="text" width="200px" height="50px" />
                  ) : (
                    <Typography variant="h4" sx={{ fontWeight: "500" }}>
                      {`$${data.post.price}`}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                sx={{ color: "rgb(170,183,199)", mt: 4, fontSize: 20 }}
              >
                Description
              </Typography>
              {isLoading ? (
                <Skeleton variant="retangular" width="975px" height="100px" />
              ) : (
                <Typography>{data.post.description}</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default Detail;
