import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useGetPostsQuery } from "../../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import { setPageIndex } from "../../../features/search/searchSlice";
import { Box, Container, Grid, Pagination } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Posts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: `/admin/posts`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      //dispatch(setPosts(response.data.posts.docs));
      setPosts(response.data.posts.docs);
      setMaxPageIndex(response.data.posts.pages);
      setTotal(response.data.posts.total);
    });
    //eslint-disable-next-line
  }, []);

  const updatePosts = (newPageIndex) => {
    setPageIndex(newPageIndex);
    axios({
      method: "GET",
      url: `/admin/posts?page=${newPageIndex}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setPosts(response.data.posts.docs);
    });
  };

  const columns = [
    { name: "Title", options: { filterOptions: { fullWidth: true } } },
    "Author",
    "Price",
    "Category",
    "Location",
    "Plan",
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
    count: total,
    pagination: false,
    responsive: "vertical",
    //tableBodyHeight: "760px",
    tableBodyMaxHeight: "",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    onChangePage: (number) => {
      console.log(number);
      axios({
        method: "GET",
        url: `/admin/posts?page=${number}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((response) => {
        setPosts(response.data.posts.docs);
      });
    },
    onRowClick: (
      rowData,
      rowMeta
      // rowData: string[],
      // rowMeta: { dataIndex: number, rowIndex: number }
    ) => {
      history.push(`/posts/${posts[rowMeta.dataIndex]._id}`);
    },
  };

  const rows = posts
    ? posts.map((post) => [
        post.title,
        post.author.fullName,
        Math.floor(post.price * 100) / 100,
        post.category.name,
        post.location,
        post.promotionalPlan,
        post.expirationDate
          ? post.expirationDate
              .split("T")[0]
              .concat(", ", post.expirationDate.split("T")[1].split(".")[0])
          : "None",
        Math.floor(post.postScore * 100) / 100,
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
      <Grid container justifyContent="space-around">
        <Grid item>
          <Pagination
            color="primary"
            count={maxPageIndex}
            siblingCount={2}
            boundaryCount={2}
            page={pageIndex}
            onChange={(event, newPageIndex) => {
              updatePosts(newPageIndex);
            }}
            sx={{ mt: 5, ml: 0 }}
          />
        </Grid>
      </Grid>
    </Box>
    // </Container>
  );
}

export default Posts;
