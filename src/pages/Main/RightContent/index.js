import { Grid, IconButton } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
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
    <Grid container spacing={2} sx={{ px: 4, py: 2.5 }}>
      <Grid item xs={12}>
        <ProductCard index={index} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <ProductCard index={index + 1} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <ProductCard index={index + 2} isLoading={isLoading} />
      </Grid>
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
  );
}

export default RightContent;
