import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PostCard from "../../../components/PostCard";
import { Scrollbars } from "react-custom-scrollbars";
import { useGetPostsQuery } from "../../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import { setPageIndex } from "../../../features/search/searchSlice";

function RightContent() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { data } = useGetPostsQuery(search);
  let maxPageIndex = 1;
  let posts = [];

  useEffect(() => {
    if (data && data.posts) {
      dispatch(setPosts(data.posts.docs));
    }
    //eslint-disable-next-line
  }, [data]);

  if (data && data.posts) {
    posts = data.posts.docs;
    maxPageIndex = data.posts.pages;
  }
  const updatePosts = (newPageIndex) => {
    dispatch(setPageIndex(newPageIndex));
  };

  return (
    <Box
      sx={{
        px: 4,
        pb: 0.5,
        ml: -0.5,
        height: "114%",
        width: 950,
        position: "relative",
        top: "0%",
        left: "0%",
      }}
    >
      {/* <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderTrackHorizontal={(props) => (
          <div
            {...props}
            className="track-horizontal"
            style={{ display: "none" }}
          />
        )}
        renderThumbHorizontal={(props) => (
          <div
            {...props}
            className="thumb-horizontal"
            style={{ display: "none" }}
          />
        )}
        renderTrackVertical={(props) => (
          <div
            {...props}
            className="track-vertical"
            style={{ display: "none" }}
          />
        )}
        renderThumbVertical={(props) => (
          <div
            {...props}
            className="thumb-vertical"
            style={{ display: "none" }}
          />
        )}
      > */}
      {posts.length === 0 && (
        <Typography
          sx={{
            fontSize: 22,
            position: "relative",
            top: "49%",
            left: "39%",
          }}
        >
          No Posts Found
        </Typography>
      )}
      <Grid container spacing={2} sx={{ px: 1.2, pb: 1.5 }}>
        {posts.length > 0 &&
          posts.map((post, i) => (
            <Grid item sx={4}>
              <PostCard post={post} index={i} key={{ i }} />
            </Grid>
          ))}
      </Grid>
      <Grid container sx={{ mt: 1, mb: 2, justifyContent: "space-around" }}>
        <Grid item>
          <Pagination
            color="primary"
            count={maxPageIndex}
            siblingCount={2}
            boundaryCount={2}
            page={search.pageIndex}
            onChange={(event, newPageIndex) => {
              updatePosts(newPageIndex);
            }}
            sx={{ mt: 1, ml: -4.4 }}
          />
        </Grid>
      </Grid>
      {/* </Scrollbars> */}
    </Box>
  );
}

export default RightContent;
