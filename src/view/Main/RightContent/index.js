import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./ProductCard";
import { Scrollbars } from "react-custom-scrollbars";
import { useGetPostsQuery } from "../../../api/posts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { setPosts } from "../../../features/posts/postsSlice";
import { useState, useEffect } from "react";

function RightContent() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostsQuery();

  useEffect(() => {
    if (data) dispatch(setPosts(data));
    //eslint-disable-next-line
  }, [data]);

  return (
    <Box sx={{ px: 4, py: 2.5, height: 800 }}>
      <Grid container sx={{ mb: 3, justifyContent: "space-between" }}>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => setIndex(index === 0 ? 0 : index - 3)}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={() => setIndex(index + 3)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
          <Grid item xs={12}>
            <ProductCard />
          </Grid>
        </Grid>
      </Scrollbars>
    </Box>
  );
}

export default RightContent;
