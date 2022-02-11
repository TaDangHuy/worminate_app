import { Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#3b8767",
      color: "#fff",
      fontSize: "100%",
      lineHeight: 1.5,
    }}
  >
    <Typography sx={{ textAlign: "center", fontSize: "15em", fontWeight: 100 }}>
      404
    </Typography>
    <Typography
      sx={{
        fontSize: "2em",
        textAlign: "center",
        fontWeight: 100,
        mb: 2,
      }}
    >
      Oops! Page not found.
    </Typography>
    <div style={{ margin: "auto", width: "90px" }}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <Button
          startIcon={<HomeIcon />}
          sx={{ color: "white", fontSize: "1.5em" }}
          size="large"
        >
          Home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
