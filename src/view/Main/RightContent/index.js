import { Grid, Typography, Button } from "@mui/material";
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
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostsQuery(pageIndex);

  useEffect(() => {
    if (data) {
      // console.log("data", data);
      dispatch(setPosts(data.posts.docs));
    }
    //eslint-disable-next-line
  }, [data]);

  const updatePosts = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <Box
      sx={{
        px: 4,
        pb: 0.5,
        height: "76%",
        width: "60%",
        position: "absolute",
        top: "16%",
        left: "33%",
      }}
    >
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
      <Grid container sx={{ mt: 1, mb: 2, justifyContent: "space-between" }}>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => updatePosts(pageIndex === 1 ? 1 : pageIndex - 1)}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => updatePosts(pageIndex === 60 ? 60 : pageIndex + 1)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RightContent;
