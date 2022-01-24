import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetPostsQuery } from "../../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import { setPageIndex } from "../../../features/search/searchSlice";
import { Box, Container } from "@mui/material";

function Products() {
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

  const columns = [
    { name: "Title", options: { filterOptions: { fullWidth: true } } },
    "Author",
    "Location",
    "Promotional plan",
    "Expiration date",
    "Score",
    "Created at",
  ];

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "800px",
    tableBodyMaxHeight: "",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  const rows = posts
    ? posts.map((post) => [
        post.title,
        post.author.fullName,
        post.location,
        post.promotionalPlan,
        post.expirationDate
          .split("T")[0]
          .concat(", ", post.expirationDate.split("T")[1].split(".")[0]),
        Math.round(post.postScore),
        post.createdAt
          .split("T")[0]
          .concat(", ", post.createdAt.split("T")[1].split(".")[0]),
      ])
    : "";

  return (
    // <Container
    //   //maxWidth="lg"

    // >
    <Box sx={{ mx: 5 }}>
      <MUIDataTable
        title={"Product list"}
        data={rows}
        columns={columns}
        options={options}
      />
    </Box>
    // </Container>
  );
}

export default Products;