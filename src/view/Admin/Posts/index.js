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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import SnackbarCustom from "../../../components/SnackbarCustom";
import { Delete } from "@mui/icons-material";

function Posts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/admin/posts`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
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
    download: false,
    print: false,
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
    customToolbarSelect: (selectedRows) => {
      return (
        <Tooltip title="Delete post">
          <IconButton sx={{ mr: 4, mt: 0 }}>
            <Delete
              onClick={() => {
                setNumberOfRows(selectedRows.data.length);
                console.log(numberOfRows);
                setSelectedRows(selectedRows.data);
                setOpenDialog(true);
              }}
            />
          </IconButton>
        </Tooltip>
      );
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
      {posts.length === 0 && <Box sx={{ height: "14.8vh" }} />}
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
      <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
        <DialogTitle>
          <Typography variant="h4" sx={{}}>
            Delete post
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{}}>
            Do you really want to delete selected posts?
          </Typography>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Box sx={{ px: 3, mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  let count = 0;
                  console.log(numberOfRows);
                  setLoading(true);
                  selectedRows.forEach((row) => {
                    axios({
                      method: "DELETE",
                      url: `/admin/posts`,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      data: {
                        id: posts[row.index]._id,
                      },
                    })
                      .then((response) => {
                        count++;
                        console.log(count);
                        if (count === numberOfRows) {
                          setLoading(false);
                          setOpenDialog(false);
                          setSnackbarProps({
                            severity: "success",
                            message: "Deleted all posts successfully",
                          });
                          setOpenSnackbar(true);
                          axios({
                            method: "GET",
                            url: `/admin/posts`,
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }).then((response) => {
                            setPosts(response.data.posts.docs);
                            setMaxPageIndex(response.data.posts.pages);
                            setTotal(response.data.posts.total);
                          });
                        }
                      })
                      .catch((error) => {
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "error",
                          message: "Could not delete all posts",
                        });
                        setOpenSnackbar(true);
                      });
                  });
                }}
              >
                Yes
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </Box>
    // </Container>
  );
}

export default Posts;
