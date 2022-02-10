import React, { useState } from "react";
import MUIDataTable from "mui-datatables";

import { useEffect } from "react";

import { Box, Container, Grid, IconButton, Pagination } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Block from "@mui/icons-material/Block";

function Users() {
  const history = useHistory();

  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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
    onChangePage: (number) => {
      console.log(number);
      axios({
        method: "GET",
        url: `/admin/users?page=${number}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((response) => {
        setUsers(response.data.users.docs);
      });
    },
    onRowClick: (
      rowData,
      rowMeta
      // rowData: string[],
      // rowMeta: { dataIndex: number, rowIndex: number }
    ) => {
      history.push(`/profile/${users[rowMeta.dataIndex]._id}`);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return (
        // <Grid>
        <IconButton sx={{ mr: 3, mt: 0 }}>
          <Block />
        </IconButton>
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
        user.userRank,

        Math.floor(user.userScore * 100) / 100,
        user.reported,
        user.active ? "Normal" : "Blocked",
      ])
    : "";

  return (
    <Box sx={{ mx: 5 }}>
      <MUIDataTable
        title={"Product list"}
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
    </Box>
  );
}

export default Users;
