import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Slider,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import { LocationOn } from "@mui/icons-material";
import Categories from "./Categories";
import { setOtherFilters } from "../../../features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPostsQuery } from "../../../api/posts";
import { setPosts } from "../../../features/posts/postsSlice";

function LeftContent() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const { data } = useGetPostsQuery(search, {
    skip,
  });

  useEffect(() => {
    if (data && data.posts) dispatch(setPosts(data.posts.docs));
    //eslint-disable-next-line
  }, [data]);

  const [rating, setRating] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(50);
  return (
    <Box
      sx={{
        pl: 1,
        pb: -3.5,
        ml: 4,
        mt: 2,
        width: 300,
      }}
    >
      <Card
        sx={{ height: "100%", pt: 2, pb: 1.5, px: 3, borderRadius: 6 }}
        elevation={3}
      >
        <CardContent sx={{ pl: 2.2 }}>
          <Grid container gridAutoFlow="column" gap={2}>
            <Grid item xs={6} sx={{ mt: -1 }}>
              <Filter />
            </Grid>
            <Grid item xs={6} sx={{}}>
              <Categories />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ position: "relative", top: "12%", left: "0%" }}
              >
                Rating
              </Typography>
              <Rating
                sx={{ position: "relative", top: "-36%", left: "31.3%" }}
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: -5 }}>
              <TextField
                type="number"
                label="Min price"
                sx={{ width: "97%" }}
                variant="standard"
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Max price"
                sx={{ width: "97%" }}
                variant="standard"
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{}}>
              <TextField
                label="Location"
                value={location}
                variant="standard"
                sx={{ width: "76%" }}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
              <IconButton sx={{ mt: 1.5 }}>
                <LocationOn
                  sx={{
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(function (
                      position
                    ) {
                      setLocation(
                        `[${position.coords.longitude}, ${position.coords.latitude}]`
                      );
                    });
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {"Around "}
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                >
                  {distance}km
                </Typography>
              </Typography>
              <Slider
                sx={{ width: "96%", mt: 1 }}
                value={distance}
                onChange={(event, newDistance) => setDistance(newDistance)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mx: "38px", mt: -2.5 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              dispatch(
                setOtherFilters({
                  avgRating: rating,
                  minPrice: minPrice,
                  maxPrice: maxPrice,
                  location: location,
                  distance: distance,
                })
              );
              setSkip(false);
            }}
          >
            Apply
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setRating(null);
              setMinPrice("");
              setMaxPrice("");
              setLocation("");
              setDistance(50);
              dispatch(
                setOtherFilters({
                  avgRating: null,
                  minPrice: "",
                  maxPrice: "",
                  location: "",
                  distance: 50,
                })
              );
              setSkip(false);
            }}
          >
            Reset
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default LeftContent;
