import {
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// import { accountService } from "../../../_services";

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

function User() {
  const classes = useStyle();

  const [isLoggedIn, setisLoggedIn] = useState(false);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  return (
    <div className={classes.container}>
      <Link to="/login">
        <Avatar/>
      </Link>

      <div className={classes.user}>
        <Typography variant="h6" className={classes.typography}>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Name
          </Link>
        </Typography>
        <Typography variant="subtitle1" className={classes.typography}>
          User
        </Typography>
      </div>

      {!isLoggedIn? (<Button> <Link to="/login">Login</Link></Button>): (<Button>Logout</Button>) }

    </div>
  );
}

export default User;
