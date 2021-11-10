import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

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

  const [value, setValue] = useState("En");
  console.log(value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Avatar src="C:\Users\ADMIN\OneDrive\Desktop\WebProject\client\src\pages\Login\idol.png" />

      <div className={classes.user}>
        <Typography variant="h6" className={classes.typography}>
          Name
        </Typography>
        <Typography variant="subtitle1" className={classes.typography}>
          User
        </Typography>
      </div>

      <FormControl sx={{ m: 1, minWidth: 70 }}>
        <Select
          value={value}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          sx={{ borderRadius: "20px" }}
        >
          <MenuItem value={"En"}>En</MenuItem>
          <MenuItem value={"Vn"}>Vn</MenuItem>
          <MenuItem value={"Jp"}>Jp</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default User;
