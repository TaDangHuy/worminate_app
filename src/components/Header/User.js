import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  user: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3.5),
  },
  typography: {
    lineHeight: "25px",
    fontSize: "22px",
  },
  select: {
    outline: "none",
  },
}));

function User({ userName, isAdmin, setUserNameProps }) {
  const classes = useStyle();

  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    if (userName) setisLoggedIn(true);
  }, [userName]);

  const handleLogout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/logout",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: {
          token: localStorage.getItem("token"),
        },
      });

      console.log(response);
      localStorage.clear();
      setUserNameProps("");
      setisLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.container}>
      <Link to="/profile">
        <IconButton color="primary" sx={{ mr: -1 }}>
          <Avatar alt={userName} src={localStorage.getItem("avatar")} />
        </IconButton>
      </Link>

      <div className={classes.user}>
        <Typography variant="body1" className={classes.typography}>
          {userName ? userName : "Guest"}
        </Typography>
        {/* <Typography variant="subtitle1" className={classes.typography}>
          {isAdmin === "true" ? "admin" : "user"}
        </Typography> */}
      </div>

      {!isLoggedIn ? (
        <Button sx={{ height: 39, width: 80, mb: 0.5, mt: 1 }}>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Sign in
          </Link>
        </Button>
      ) : (
        <Button onClick={handleLogout} sx={{ height: 39, width: 100, ml: 0 }}>
          Sign out
        </Button>
      )}
    </div>
  );
}

export default User;
