import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PostCard from "../../../components/PostCard";
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
        ml: 11,
        mt: 1.9,
        minHeight: "540px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {posts.length === 0 && (
        <Typography
          sx={{
            fontSize: 22,
            mx: 36.3,
            my: 29,
          }}
          variant="subtitle1"
        >
          No Posts Found
        </Typography>
      )}
      <Grid container spacing={3} sx={{ px: 1.2, pb: 1.5 }}>
        {posts.length > 0 &&
          posts.map((post, i) => (
            <Grid item sx={4}>
              <PostCard post={post} index={i} key={{ i }} />
            </Grid>
          ))}
      </Grid>
      {maxPageIndex > 1 && (
        <Grid container sx={{ mt: 1, justifyContent: "space-around" }}>
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
      )}
      {/* </Scrollbars> */}
    </Box>
  );
}

export default RightContent;
