import React, { useState } from "react";
import MUIDataTable from "mui-datatables";

import { useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import SnackbarCustom from "../../../components/SnackbarCustom";
import { Autorenew } from "@mui/icons-material";

function Users() {
  const history = useHistory();

  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const [users, setUsers] = useState([]);
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
      url: `/admin/users`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setUsers(response.data.users.docs);
      setMaxPageIndex(response.data.users.pages);
      setTotal(response.data.users.total);
    });
    //eslint-disable-next-line
  }, []);

  const updateUsers = (newPageIndex) => {
    setPageIndex(newPageIndex);
    axios({
      method: "GET",
      url: `/admin/users?page=${newPageIndex}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setUsers(response.data.users.docs);
    });
  };

  const columns = [
    { name: "Username", options: { filterOptions: { fullWidth: true } } },
    "Email",
    "Joined",
    "For Sale",
    "Sold",
    "Used Tokens",
    "User Rank",
    "Score",
    "Reported",
    "Status",
  ];

  const options = {
    filter: true,
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filterType: "textField",
    count: total,
    pagination: false,
    responsive: "vertical",
    //tableBodyHeight: "760px",
    tableBodyMaxHeight: "",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    onChangePage: (numberOfRowsber) => {
      console.log(numberOfRowsber);
      axios({
        method: "GET",
        url: `/admin/users?page=${numberOfRowsber}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((response) => {
        setUsers(response.data.users.docs);
      });
    },
    onRowClick: (
      rowData,
      rowMeta
      // rowData: string[],
      // rowMeta: { dataIndex: numberOfRowsber, rowIndex: numberOfRowsber }
    ) => {
      history.push(`/profile/${users[rowMeta.dataIndex]._id}`);
    },
    customToolbarSelect: (selectedRows) => {
      return (
        <Tooltip title="Change status">
          <IconButton sx={{ mr: 4, mt: 0 }}>
            <Autorenew
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

  const rows = users
    ? users.map((user) => [
        user.fullName,
        user.email,
        user.createdAt
          .split("T")[0]
          .concat(", ", user.createdAt.split("T")[1].split(".")[0]),
        user.postList.length,
        user.salesHistory,
        user.usedTokens,
        user.userRank === "S"
          ? "Legendary"
          : user.userRank === "A"
          ? "Master"
          : user.userRank === "B"
          ? "Pro"
          : user.userRank === "C"
          ? "Elite"
          : "Rookie",

        Math.floor(user.userScore * 100) / 100,
        user.reported,
        user.active ? "Normal" : "Blocked",
      ])
    : "";

  return (
    <Box sx={{ mx: 5 }}>
      <MUIDataTable
        title={"User list"}
        data={rows}
        columns={columns}
        options={options}
      />
      {users.length === 0 && <Box sx={{ height: "14.8vh" }} />}
      <Grid container justifyContent="space-around">
        <Grid item>
          <Pagination
            color="primary"
            count={maxPageIndex}
            siblingCount={2}
            boundaryCount={2}
            page={pageIndex}
            onChange={(event, newPageIndex) => {
              updateUsers(newPageIndex);
            }}
            sx={{ mt: 5, ml: 0 }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
        <DialogTitle>
          <Typography variant="h4" sx={{}}>
            Change status
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{}}>
            Do you really want to change statuses of selected accounts?
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
                      method: "PUT",
                      url: `/admin/users`,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      data: {
                        id: users[row.index]._id,
                        active: !users[row.index].active,
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
                            message: "Changed all statuses successfully",
                          });
                          setOpenSnackbar(true);
                          axios({
                            method: "GET",
                            url: `/admin/users`,
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }).then((response) => {
                            setUsers(response.data.users.docs);
                            setMaxPageIndex(response.data.users.pages);
                            setTotal(response.data.users.total);
                          });
                        }
                      })
                      .catch((error) => {
                        setLoading(false);
                        setOpenDialog(false);
                        setSnackbarProps({
                          severity: "error",
                          message: "Could not change all statuses",
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
  );
}

export default Users;
