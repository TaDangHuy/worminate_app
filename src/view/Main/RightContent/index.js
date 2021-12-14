import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductCard from "./ProductCard";
import { Scrollbars } from "react-custom-scrollbars";
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
    </Box>
  );
}

export default RightContent;
