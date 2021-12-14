<<<<<<< HEAD
import { Grid } from "@mui/material";
=======
import { Grid, IconButton } from "@mui/material";
>>>>>>> 861d87ae921a6a6952fc2cfddeded166fd580ee5
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./ProductCard";
import { Scrollbars } from "react-custom-scrollbars";
<<<<<<< HEAD
import { useGetPostsQuery } from "../../../api/api.js";
import { useDispatch } from "react-redux";
import { deletePost, setPost } from "../../../features/posts/postSlice";

function RightContent() {
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError } = useGetPostsQuery();

  // if (isSuccess) {
  //   dispatch(deletePost("61b05e7c96a8e24058e44b64"));
  //   console.log("success");
  // }
  return (
    <Box sx={{ px: 4, py: 2.5, height: 800 }}>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && (
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProductCard />
            </Grid>
          </Grid>
        </Scrollbars>
      )}
      {isError && <h2>Error</h2>}
=======
import { useGetPostsQuery } from "../../../api/posts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { setPosts } from "../../../features/posts/postsSlice";
import { useState, useEffect } from "react";

function RightContent() {
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostsQuery();

  useEffect(() => {
    if (data) dispatch(setPosts(data.posts.docs));
    //eslint-disable-next-line
  }, [data]);

  return (
    <Box sx={{ px: 4, py: 2.5, height: 800 }}>
      <Grid container sx={{ mb: 3, justifyContent: "space-between" }}>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => setPageIndex(pageIndex === 1 ? 1 : pageIndex - 1)}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => setPageIndex(pageIndex === 60 ? 60 : pageIndex + 1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductCard index={0} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={1} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={2} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={3} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={4} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={5} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={6} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={7} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={8} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <ProductCard index={9} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Scrollbars>
>>>>>>> 861d87ae921a6a6952fc2cfddeded166fd580ee5
    </Box>
  );
}

export default RightContent;
