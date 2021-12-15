import { Grid, ListItemText, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import ProductCard from "./ProductCard";

import { useDispatch } from "react-redux";
import { useGetPostsQuery } from "../../../api/posts";
import { setPosts } from "../../../features/posts/postsSlice";
import { useEffect } from "react";

function LeftContent() {
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetPostsQuery();

  useEffect(() => {
    if (data) dispatch(setPosts(data.posts.docs));
    //eslint-disable-next-line
  }, [data]);
  return (
    <Box sx={{ p: 2 }}>
      <Grid container direction="column">
        {/* <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <ListItemText
                primary="Apartments in New York"
                secondary="1248 results -Jan 9, 2014"
              />
            </Grid>
            <Grid item>
              <ListItemText primary="Wi-Fi" />
              <Switch
                edge="end"
                inputProps={{
                  "aria-labelledby": "switch-list-label-wifi",
                }}
              />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item mb={2}>
          <Grid container justifyContent="space-between">
            <Grid item>Top Product</Grid>
            <Grid item>icon, sort by</Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ height: "635px" }}>
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <Grid container>
              <Grid item xs={12} mb={2}>
                  <ProductCard index={0} isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} mb={2}>
                  <ProductCard index={1} isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} mb={2}>
                  <ProductCard index={2} isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} mb={2}>
                  <ProductCard index={3} isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} mb={2}>
                  <ProductCard index={4} isLoading={isLoading} />
              </Grid>
            </Grid>
          </Scrollbars>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeftContent;
