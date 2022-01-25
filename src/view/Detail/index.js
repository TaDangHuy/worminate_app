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
  DialogActions,
  TextField,
  Avatar,
  Stack,
} from "@mui/material";

import SimpleReactLightbox, {
  SRLWrapper,
  useLightbox,
} from "simple-react-lightbox";

import React, { useState } from "react";
import Header from "../../components/Header";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import Footer from "../../components/Footer";
import { useGetPostQuery } from "../../api/posts";
import { useEffect } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Add from "@mui/icons-material/Add";
import { PersonAddAlt1, PersonRemoveAlt1 } from "@mui/icons-material";

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
import { Edit, Delete } from "@mui/icons-material";
import { FaMapMarkedAlt } from "react-icons/fa";
import Menu from "./Menu";

function Detail() {
  let { url } = useRouteMatch();
  let { idPost } = useParams();
  const [status, setStatus] = useState(true);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [rating, setRating] = useState(null);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [newRating, setNewRating] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [state, setState] = useState(0);
  const [reviewId, setReviewId] = useState("");
  const [reviewsScore, setReviewsScore] = useState(null);

  // const [skip, setSkip] = useState(false);
  const { data, isLoading } = useGetPostQuery(`posts/${idPost}`);
  const images = data ? data.post.images : [];
  let price;
  // const [authorId, setAuthorId] = useState("");
  if (data) price = Math.floor((data.post.price * 100) / 100);
  const [image, setImage] = useState(
    "https://www.viet247.net/images/noimage_food_viet247.jpg"
  );

  useEffect(() => {
    if (data && data.post.images.length > 0) {
      setImage(data.post.images[0].path);
    }
    if (data) {
      axios({
        method: "GET",
        url: `/user`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((response) => {
          response.data.user.favoritesProduct.forEach((post) => {
            if (post._id === data.post._id) setIsHeartClicked(true);
          });
          response.data.user.manageFollowers.follow.forEach((user) => {
            if (user._id === data.post.author._id) setFollowing(true);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      data.post.reviews.forEach((review) => {
        if (review.author._id === localStorage.getItem("_id")) {
          setReviewed(true);
          setRating(review.rating);
          setComment(review.body);
          setReviewId(review._id);
        }
      });
      setReviewsScore(data.post.reviewsScore);
      setStatus(data.post.status);
    }
    //eslint-disable-next-line
  }, [data]);

  const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("");
  const handleClickOpen = (value) => {
    if (value === 1) setState(1);
    else if (value === 2) setState(2);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const { openLightbox } = useLightbox();

  return (
    <>
      <Switch>
        <Route path={`${url}/edit`}>
          {/* <Route path={`${url}/edit`} component={Create_Edit_Post}> */}
          <Create_Edit_Post post={data?.post} />
        </Route>
        <Route exact path={`${url}`}>
          <Box sx={{ backgroundColor: "#f5f8fb" }}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
              <Paper
                sx={{
                  mt: 4.5,
                  mb: 5,
                  ml: 1.5,
                  px: 2,
                  pt: 3,
                  pb: 3,
                  borderRadius: 3,
                }}
                elevation={4}
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
                          <Grid container>
                            <Grid item xs={9}>
                              <Typography
                                variant="h4"
                                sx={{ mb: 0.5, ml: 0.2, mt: 0.2 }}
                              >
                                {data.post.title}
                              </Typography>
                            </Grid>
                            <Grid item>
                              {data.post.author._id ===
                              localStorage.getItem("_id") ? (
                                status ? (
                                  <Button
                                    sx={{ mb: 0.5, ml: -3, mt: 0.1 }}
                                    variant="outlined"
                                    disableRipple
                                    disableElevation
                                    disableFocusRipple
                                  >
                                    For sale
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{ mb: 0.5, ml: 0.8, mt: 0.1 }}
                                    variant="outlined"
                                    disableRipple
                                    disableElevation
                                    disableFocusRipple
                                    color="error"
                                  >
                                    Sold
                                  </Button>
                                )
                              ) : (
                                ""
                              )}
                            </Grid>
                          </Grid>
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
                                value={reviewsScore}
                                readOnly
                                size="large"
                              />
                            </Box>
                          </>
                        )}
                      </Grid>
                      <Grid item xs={3} sx={{ mt: 0.3, ml: -0.5 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "rgb(170,183,199)",
                            fontSize: 22,
                          }}
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
                              size={26}
                              color="#3b8767"
                              style={{
                                margin: "0px -3px 9px -6px",
                              }}
                            />
                            <Typography
                              variant="h4"
                              color="primary"
                              noWrap
                              sx={{
                                fontWeight: 580,
                                display: "inline",
                              }}
                            >
                              {price}
                            </Typography>
                          </>
                        )}
                      </Grid>
                      {/* <Grid item xs={2} sx={{ mt: 0.3 }}> */}
                      {token &&
                        !isLoading &&
                        localStorage.getItem("_id") !==
                          data.post.author._id && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "14.6%",
                              left: "81.1%",
                            }}
                          >
                            <Heart
                              isClick={isHeartClicked}
                              onClick={() => {
                                const id = data.post._id;
                                if (isHeartClicked) {
                                  axios({
                                    method: "DELETE",
                                    url: `posts/favorite`,
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: {
                                      id,
                                    },
                                  })
                                    .then((response) => {})
                                    .catch((err) => console.log(err));
                                } else {
                                  axios({
                                    method: "POST",
                                    url: `posts/favorite`,
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: {
                                      id,
                                    },
                                  })
                                    .then((response) => {})
                                    .catch((err) => console.log(err));
                                }
                                setIsHeartClicked(!isHeartClicked);
                              }}
                            />
                          </Box>
                        )}
                      {!isLoading &&
                        localStorage.getItem("_id") ===
                          data.post.author._id && (
                          <Grid item xs={1} sx={{ pl: 2 }}>
                            <Menu
                              status={status}
                              setStatus={setStatus}
                              idPost={idPost}
                              token={token}
                              url={url}
                            />
                            {/* <Stack spacing={0} sx={{ mt: 0 }} direction="row">
                              <IconButton sx={{ height: 45 }}>
                                <LocalAtm
                                  sx={{
                                    ":hover": {
                                      color: "primary.main",
                                    },
                                  }}
                                />
                              </IconButton>
                              <Link
                                to={`${url}/edit`}
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                <IconButton sx={{ height: 45 }}>
                                  <Edit
                                    sx={{
                                      ":hover": {
                                        color: "primary.main",
                                      },
                                    }}
                                  />
                                </IconButton>
                              </Link>

                              <IconButton sx={{ height: 45 }}>
                                <Delete
                                  sx={{
                                    ":hover": {
                                      color: "primary.main",
                                    },
                                  }}
                                />
                              </IconButton>
                            </Stack> */}
                          </Grid>
                        )}
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
                          height="388px"
                          width="600px"
                          style={{ borderRadius: 6 }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ ml: 6, mt: -1 }}>
                        <SimpleReactLightbox>
                          <SRLWrapper>
                            <Splide
                              options={{
                                width: 610,
                                height: 400,
                                perPage: 1,
                                pagination: false,
                                // focus: "center",
                              }}
                            >
                              {" "}
                              {images.map((image, i) => (
                                <SplideSlide>
                                  {" "}
                                  <Box
                                    sx={{
                                      width: 600,
                                      height: 388,
                                      ml: 0.7,
                                      mr: 1.8,
                                      borderRadius: 3,
                                      objectFit: "cover",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
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
                          </SRLWrapper>
                        </SimpleReactLightbox>
                      </Box>
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
                              borderRadius: 3,
                            }}
                          >
                            <Skeleton
                              variant="retangular"
                              width="315px"
                              height="285px"
                              sx={{ ml: -3.1, mt: -0.4 }}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              mt: -1,
                              ml: -1.3,
                              width: 350,
                            }}
                          >
                            <Map
                              posts={[data.post]}
                              location={data.post.geometry.coordinates}
                              height="300px"
                              zoom={12.5}
                            />
                          </Box>
                        )}
                      </Grid>
                      <Grid item sx={{ mt: 1.3 }}>
                        <Grid container>
                          <Grid item xs={4}>
                            <Box sx={{ mt: 0.75, ml: -1.2 }}>
                              {" "}
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "rgb(170,183,199)",
                                  fontSize: 24,
                                }}
                              >
                                Location
                              </Typography>
                            </Box>
                          </Grid>
                          {!isLoading && (
                            <Grid item xs={8}>
                              <Box>
                                <a
                                  href={`https://www.google.com/maps/search/${data.post.location}/${data.post.geometry.coordinates[1]},${data.post.geometry.coordinates[0]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <Button
                                    startIcon={<FaMapMarkedAlt />}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1, ml: 8 }}
                                  >
                                    Google map
                                  </Button>
                                  {/* <Button
                                    startIcon={}
                                    variant="contained"
                                    size="small"
                                  >
                                    Google map
                                  </Button> */}
                                </a>
                              </Box>
                            </Grid>
                          )}
                          {isLoading ? (
                            <Skeleton
                              variant="text"
                              width="200px"
                              height="40px"
                              sx={{ ml: -1.3 }}
                            />
                          ) : (
                            <Typography
                              sx={{ mt: 1, ml: -1.2, fontSize: "17px" }}
                            >
                              {data.post.location}{" "}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={7} sx={{ ml: 12.3, mb: 3, mt: 1 }}>
                    {isLoading ? (
                      <Skeleton
                        variant="retangular"
                        width="500px"
                        height="75px"
                        sx={{ ml: 0.5, mt: 1.5 }}
                      />
                    ) : (
                      <>
                        <SimpleReactLightbox>
                          <SRLWrapper>
                            <Splide
                              options={{
                                width: 500,
                                height: 80,
                                perPage: 5,
                                pagination: false,
                                // focus: "center",
                              }}
                            >
                              {" "}
                              {images.map((image, i) => (
                                <SplideSlide>
                                  {" "}
                                  <Box
                                    sx={{
                                      width: 75,
                                      height: 75,
                                      ml: 1.6,
                                      mr: 1,
                                      borderRadius: 3,
                                      objectFit: "cover",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)",
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
                          </SRLWrapper>
                        </SimpleReactLightbox>
                      </>
                    )}
                  </Grid>

                  <Grid item sx={{ mt: 1.5, ml: -2 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(170,183,199)", fontSize: 24 }}
                    >
                      Category
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="text" width="200px" height="40px" />
                    ) : (
                      <Typography sx={{ mt: 0.7, fontSize: "17px" }}>
                        {data.post.category.name}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2, ml: 7 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgb(170,183,199)", fontSize: 22 }}
                    >
                      Author
                    </Typography>
                    {isLoading ? (
                      <Skeleton variant="text" width="200px" height="40px" />
                    ) : (
                      <Grid container sx={{ mt: 1 }}>
                        <Grid item>
                          {" "}
                          <Link
                            to={`/profile/${data.post.author._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <IconButton>
                              {" "}
                              <Avatar
                                src={data.post.author.image.path}
                                sx={{ display: "flex", ml: -0.8 }}
                              />
                            </IconButton>
                          </Link>
                        </Grid>
                        <Grid item sx={{ mt: 1.8, ml: 1 }}>
                          <Typography variant="subtitle1">
                            {data.post.author.fullName}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ ml: 2, mt: 0.6 }}>
                          {token &&
                            data.post.author._id !==
                              localStorage.getItem("_id") &&
                            (following ? (
                              <Button
                                startIcon={<PersonRemoveAlt1 />}
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => {
                                  axios({
                                    method: "DELETE",
                                    url: "/user/followers",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: { userId: data.post.author._id },
                                  }).then(() => {
                                    setFollowing(false);
                                  });
                                }}
                              >
                                Unfollow
                              </Button>
                            ) : (
                              <Button
                                startIcon={<PersonAddAlt1 />}
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => {
                                  axios({
                                    method: "POST",
                                    url: "/user/followers",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                    data: { userId: data.post.author._id },
                                  }).then(() => {
                                    setFollowing(true);
                                  });
                                }}
                              >
                                Follow
                              </Button>
                            ))}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ mx: 7, mt: 3 }}>
                    <Grid container spacing={2}></Grid>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgb(170,183,199)",
                        mt: 2,
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

                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, ml: 6.8, display: "inline" }}
                >
                  Reviews
                </Typography>
                {loading && (
                  <Box sx={{ px: 3, mt: 1 }} component="span">
                    <CircularProgress size={20} />
                  </Box>
                )}
                {token && !isLoading && !reviewed && !loading && (
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
                  sx={{ borderRadius: 3 }}
                >
                  <DialogTitle>
                    {state === 0 ? "Add " : state === 1 ? "Edit " : "Delete "} a
                    review
                  </DialogTitle>
                  <DialogContent>
                    <Typography variant="subtitle1" sx={{}}>
                      Rating
                    </Typography>
                    <Rating
                      sx={{ ml: -0.3 }}
                      value={newRating}
                      readOnly={state === 2 ? true : false}
                      onChange={(event, newValue) => setNewRating(newValue)}
                    />
                    <Typography variant="subtitle1" sx={{}}>
                      Comment
                    </Typography>
                    <TextField
                      sx={{ width: 500 }}
                      autoFocus
                      margin="dense"
                      fullWidth
                      multiline
                      rows={8}
                      // maxRows={8}
                      placeholder=""
                      value={newComment}
                      disabled={state === 2 ? true : false}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    {loading ? (
                      <Box sx={{ px: 3, mt: 1 }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Button onClick={handleClose}>Cancel</Button>
                        {!reviewed && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "POST",
                                url: `posts/${idPost}/reviews`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {
                                    body: newComment,
                                    rating: newRating,
                                  },
                                },
                              })
                                .then(({ data }) => {
                                  setLoading(false);
                                  setRating(newRating);
                                  setComment(newComment);
                                  setReviewId(data.id);
                                  setReviewsScore(data.reviewsScore);
                                  setReviewed(true);
                                })
                                .catch((err) => console.log(err));
                            }}
                          >
                            Add
                          </Button>
                        )}
                        {reviewed && state === 1 && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "PUT",
                                url: `posts/${idPost}/reviews/${reviewId}`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {
                                    body: newComment,
                                    rating: newRating,
                                  },
                                },
                              })
                                .then(({ data }) => {
                                  setState(0);
                                  setLoading(false);
                                  setRating(newRating);
                                  setComment(newComment);

                                  setReviewsScore(data.reviewsScore);
                                })
                                .catch((err) => console.log(err));
                            }}
                          >
                            Edit
                          </Button>
                        )}
                        {reviewed && state === 2 && (
                          <Button
                            onClick={() => {
                              handleClose();
                              setLoading(true);
                              axios({
                                method: "DELETE",
                                url: `posts/${idPost}/reviews/${reviewId}`,
                                headers: { Authorization: `Bearer ${token}` },
                                data: {
                                  review: {},
                                },
                              })
                                .then(({ data }) => {
                                  setState(0);
                                  setLoading(false);
                                  setNewRating(null);
                                  setNewComment("");
                                  setReviewsScore(data.reviewsScore);
                                  setReviewed(false);
                                })
                                .catch((err) => console.log(err));
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </>
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
                    {reviewed && (
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 3,
                          width: "100%",
                          p: 2,
                          pb: 0.5,
                          mb: 3,
                        }}
                      >
                        <Grid container spacing={0}>
                          <Grid item sx={{ ml: 1.5 }}>
                            <Stack>
                              <IconButton sx={{ mt: -0.7 }}>
                                <Avatar src={localStorage.getItem("avatar")} />
                              </IconButton>
                            </Stack>
                          </Grid>
                          <Grid item xs={10}>
                            <Box sx={{}}>
                              {" "}
                              <Typography
                                variant="subtitle1"
                                sx={{ mb: 1, ml: 0.7, mt: 1.1 }}
                              >
                                {localStorage.getItem("UserName")}
                              </Typography>
                              <Rating
                                readOnly
                                size="small"
                                value={rating}
                                sx={{ mb: 1, ml: 0.5 }}
                              />
                              <Typography
                                variant="body1"
                                sx={{ mb: 1, ml: 0.8 }}
                              >
                                {comment}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item display="flex" justifyContent="right">
                            {" "}
                            <Stack spacing={0} sx={{ mt: 0 }} direction="row">
                              <IconButton sx={{ height: 45 }}>
                                <Edit
                                  color="primary"
                                  onClick={() => {
                                    setNewRating(rating);
                                    setNewComment(comment);
                                    setState(1);
                                    setOpen(true);
                                  }}
                                />
                              </IconButton>
                              <IconButton sx={{ height: 45 }}>
                                <Delete
                                  color="primary"
                                  onClick={() => {
                                    setNewRating(rating);
                                    setNewComment(comment);
                                    setState(2);
                                    setOpen(true);
                                  }}
                                />
                              </IconButton>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>
                    )}
                    {data.post.reviews.map(
                      (review, i) =>
                        review.author._id !== localStorage.getItem("_id") && (
                          <Paper
                            elevation={3}
                            sx={{
                              borderRadius: 3,
                              width: "100%",
                              px: 2,
                              pt: 2.5,
                              pb: 0.5,
                              mb: 3,
                            }}
                          >
                            <Grid container spacing={0}>
                              <Grid item sx={{ ml: 1.5 }}>
                                <Stack>
                                  <Link
                                    to={`/profile/${review.author._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {" "}
                                    <IconButton sx={{ mt: -0.7 }}>
                                      <Avatar src={review.author.image.path} />
                                    </IconButton>
                                  </Link>
                                </Stack>
                              </Grid>
                              <Grid item xs={10}>
                                <Box sx={{}}>
                                  {" "}
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, ml: 0.7, mt: 1.1 }}
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
                                    variant="body1"
                                    sx={{ mb: 1, ml: 0.8 }}
                                  >
                                    {review.body}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        )
                    )}
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

                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ mb: 1, ml: 7.6 }}>
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
                        // focus: "center",
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
