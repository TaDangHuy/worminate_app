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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import Header from "../../components/Header";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import Footer from "../../components/Footer";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import MapIcon from "@mui/icons-material/Map";
import Add from "@mui/icons-material/Add";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
import Map from "../../components/Map";

import Create_Edit_Post from "../Create_Edit_Post";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import PostCard from "../../components/PostCard";
import { BiDollar } from "react-icons/bi";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function Detail() {
  let { url } = useRouteMatch();
  let { idPost } = useParams();
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const { data, isLoading } = useGetPostQuery(`/posts/${idPost}`);
  const images = data ? data.post.images : [];
  const [image, setImage] = useState(
    "https://www.viet247.net/images/noimage_food_viet247.jpg"
  );

  useEffect(() => {
    if (data && data.post.images.length > 0) {
      setImage(data.post.images[0].path);
    }
    //eslint-disable-next-line
  }, [data]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const [rating, setRating] = useState(null);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Switch>
        <Route path={`${url}/edit`}>
          {/* <Route path={`${url}/edit`} component={Create_Edit_Post}> */}
          <Create_Edit_Post post={data?.post} />
        </Route>
        <Route path={`${url}`}>
          <Box sx={{ backgroundColor: "#f5f5f5" }}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
              <Paper
                sx={{
                  mt: 2.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,
                  pb: 3,
                  borderRadius: 6,
                }}
                elevation={8}
              >
                <Grid container>
                  <Grid item xs={1}>
                    <Box sx={{ mt: -0.3 }}>
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
                  <Grid item xs={11} sx={{ ml: -4.4, pb: 2.2 }}>
                    <Grid container>
                      <Grid item xs={8}>
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="600px"
                            height="50px"
                            sx={{ mb: 0.5, ml: 0.2, mt: -1 }}
                          />
                        ) : (
                          <Typography
                            variant="h5"
                            sx={{ mb: 0.5, ml: 0.2, mt: 0.2 }}
                          >
                            {data.post.title}
                          </Typography>
                        )}
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="165px"
                            height="50px"
                            sx={{ mb: 1, mt: -1 }}
                          />
                        ) : (
                          <>
                            <Box sx={{ ml: -0.3 }}>
                              <Rating
                                value={data.post.reviewsScore}
                                readOnly
                                size="large"
                              />
                            </Box>
                          </>
                        )}
                      </Grid>
                      <Grid item xs={4} sx={{ mt: 0.3, pl: 0.4 }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "rgb(170,183,199)", fontSize: 20 }}
                        >
                          Price
                        </Typography>
                        {isLoading ? (
                          <Skeleton
                            variant="text"
                            width="200px"
                            height="50px"
                          />
                        ) : (
                          <>
                            {" "}
                            <BiDollar
                              size={40}
                              color="#3b8767"
                              style={{ margin: "0px -3px 18px -8px" }}
                            />
                            <Typography
                              variant="h4"
                              color="primary"
                              noWrap
                              sx={{ fontWeight: "500", display: "inline" }}
                            >
                              {`${data.post.price}`}
                            </Typography>
                          </>
                        )}
                      </Grid>
                      {/* <Grid item xs={2} sx={{ mt: 0.3 }}> */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "17.7%",
                          left: "81.3%",
                        }}
                      >
                        <Heart
                          isClick={isHeartClicked}
                          onClick={() => setIsHeartClicked(!isHeartClicked)}
                        />
                      </Box>
                      {/* </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item xs={8}>
                    {isLoading ? (
                      <Box
                        sx={{
                          ml: 7,
                          mt: -1,
                          width: 300,
                        }}
                      >
                        <Skeleton
                          variant="retangular"
                          height="370px"
                          width="600px"
                          style={{ borderRadius: 6 }}
                        />
                      </Box>
                    ) : (
                      <Box
                        component="img"
                        src={image}
                        sx={{
                          ml: 7,
                          mt: -1,
                          width: 600,
                          height: 370,
                          borderRadius: 6,
                          boxShadow:
                            "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
                          objectFit: "scale-down",
                          backgroundColor: "#f4f4f4",
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item>
                        {isLoading ? (
                          <Box
                            sx={{
                              pb: 0.5,
                              position: "relative",
                              top: "-0.6%",
                              left: "3%",
                              width: 460,
                              borderRadius: 6,
                            }}
                          >
                            <Skeleton
                              variant="retangular"
                              width="315px"
                              height="285px"
                              sx={{ ml: -2.2, mt: -0.4 }}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              pb: 0.5,
                              mt: -1,
                              ml: -1.3,
                              width: 350,
                            }}
                          >
                            <Map
                              posts={[data.post]}
                              location={data.post.geometry.coordinates}
                              height="300px"
                            />
                          </Box>
                        )}
                      </Grid>
                      <Grid item sx={{ mt: 1 }}>
                        <Grid container>
                          <Grid item xs={10}>
                            <Typography
                              variant="body1"
                              sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
                            >
                              Location
                            </Typography>
                            {isLoading ? (
                              <Skeleton
                                variant="text"
                                width="200px"
                                height="40px"
                              />
                            ) : (
                              <Typography>{data.post.location} </Typography>
                            )}
                          </Grid>
                          <Grid item xs={2} sx={{ mt: -1, ml: -0.4 }}>
                            {!isLoading && (
                              <Box sx={{}}>
                                <a
                                  href={`https://www.google.com/maps/search/${data.post.location}/${data.post.geometry.coordinates[1]},${data.post.geometry.coordinates[0]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  {/* <Button
                                    startIcon={<MapIcon />}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1, width: 100 }}
                                  >
                                    Google map
                                  </Button> */}
                                  <IconButton>
                                    <MapIcon color="primary" />
                                  </IconButton>
                                </a>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={7} sx={{ ml: 12.5, my: 3 }}>
                    {isLoading ? (
                      <Skeleton
                        variant="retangular"
                        width="460px"
                        height="100px"
                        sx={{ ml: 3 }}
                      />
                    ) : (
                      <Splide
                        options={{
                          width: 500,
                          height: 100,
                          perPage: 4,
                          pagination: false,
                          focus: "center",
                        }}
                      >
                        {" "}
                        {images.map((image, i) => (
                          <SplideSlide>
                            {" "}
                            <Box
                              sx={{
                                width: 100,
                                height: 100,
                                ml: 1.65,
                                borderRadius: 6,
                                objectFit: "cover",
                              }}
                              component="img"
                              src={
                                image.path
                                  ? image.path
                                  : "https://onlinecrm.vn/media/default.jpg"
                              }
                              alt=""
                              onClick={() => setImage(image.path)}
                            />
                          </SplideSlide>
                        ))}
                      </Splide>
                    )}
                  </Grid>

                  <Grid item sx={{ mt: 2, ml: -1 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
                    >
                      Author
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="text" width="200px" height="40px" />
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
                    <Grid container spacing={2}></Grid>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgb(170,183,199)",
                        mt: 4,
                        mb: 1,

                        fontSize: 20,
                      }}
                    >
                      Description
                    </Typography>
                    {isLoading ? (
                      <Skeleton
                        variant="retangular"
                        width="990px"
                        height="300px"
                      />
                    ) : (
                      data.post.description
                        .split("\n")
                        .map((line) => (
                          <Typography sx={{ width: 990 }}>{line}</Typography>
                        ))
                    )}
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                sx={{
                  mt: 2.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,

                  borderRadius: 6,
                }}
                elevation={8}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, ml: 6.8, display: "inline" }}
                >
                  Reviews
                </Typography>
                {!isLoading && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleClickOpen}
                    sx={{ ml: 3, mt: -1.3 }}
                  >
                    <Add sx={{}} />
                  </IconButton>
                )}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  sx={{ borderRadius: 6 }}
                >
                  <DialogTitle>Add a review</DialogTitle>
                  <DialogContent>
                    <Typography variant="subtitle1" sx={{}}>
                      Rating
                    </Typography>
                    <Rating
                      sx={{ ml: -0.3 }}
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      variant="standard"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        onClick={() => {
                          setLoading(true);
                          axios({
                            method: "POST",
                            url: `posts/${idPost}/reviews`,
                            headers: { Authorization: `Bearer ${token}` },
                            data: { review: { body: comment, rating: rating } },
                          })
                            .then((response) => {
                              handleClose();
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </DialogActions>
                </Dialog>
                {isLoading ? (
                  <Box sx={{ ml: 7, mt: 3, mb: 1 }}>
                    {" "}
                    <Skeleton
                      variant="retangular"
                      width="990px"
                      height="300px"
                    />
                  </Box>
                ) : (
                  <Box sx={{ pb: 5, mx: 6, mt: 2.5 }}>
                    {data.post.reviews.map((review, i) => (
                      <Paper
                        elevation={4}
                        sx={{ borderRadius: 8, width: "100%", p: 2, mt: 2 }}
                      >
                        <Box sx={{}}>
                          {" "}
                          <Typography
                            variant="body1"
                            sx={{ mb: 1, ml: 0.7, mt: 1 }}
                          >
                            {review.author.fullName}
                          </Typography>
                          <Rating
                            readOnly
                            size="small"
                            value={review.rating}
                            sx={{ mb: 1, ml: 0.5 }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{ mb: 1, ml: 0.7 }}
                          >
                            {review.body}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                )}
              </Paper>
              <Paper
                sx={{
                  mt: 2.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,

                  borderRadius: 6,
                }}
                elevation={8}
              >
                <Typography variant="h6" sx={{ mb: 1, ml: 6.8 }}>
                  Related Posts
                </Typography>
                {isLoading ? (
                  <Box sx={{ ml: 7, mt: 3, mb: 1 }}>
                    {" "}
                    <Skeleton
                      variant="retangular"
                      width="990px"
                      height="300px"
                    />
                  </Box>
                ) : (
                  <Box sx={{ pb: 5, mx: 6, mt: 2.5 }}>
                    <Splide
                      options={{
                        height: 333,
                        width: 1000,
                        perPage: 4,
                        pagination: false,
                        focus: "center",
                      }}
                    >
                      {data.relatedPost.map((post, i) => (
                        <SplideSlide>
                          <Box sx={{ ml: 1.5, mr: 4 }}>
                            <PostCard key={i} post={post} />
                          </Box>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </Box>
                )}
              </Paper>
            </Container>
            <Footer />
          </Box>
        </Route>
      </Switch>
    </>
  );
}

export default Detail;
