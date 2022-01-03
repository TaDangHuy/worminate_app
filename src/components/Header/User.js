import { Avatar, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  typography: {
    lineHeight: "25px",
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

  const handleLogout = () => {
    localStorage.clear();
    setUserNameProps("");
    setisLoggedIn(false);
  };
  return (
    <div className={classes.container}>
      <Link to="/profile">
        <Avatar alt={userName} src={localStorage.getItem("avatar")} />
      </Link>

      <div className={classes.user}>
        <Typography variant="h6" className={classes.typography}>
          {userName ? userName : "Anonymous"}
        </Typography>
        <Typography variant="subtitle1" className={classes.typography}>
          {isAdmin === "true" ? "admin" : "user"}
        </Typography>
      </div>

      {!isLoggedIn ? (
        <Button>
          {" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Login
          </Link>
        </Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </div>
  );
}

export default User;
