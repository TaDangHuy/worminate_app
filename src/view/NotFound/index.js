import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { Link } from "react-router-dom";
import "./Notfound.css";

const NotFound = () => (
  <div className="not_found_container">
    <h1>404</h1>
    <p>Oops! Page not found.</p>
    <div style={{ margin: "auto", width: "90px" }}>
      <Link to="/home">
        <Button startIcon={<HomeIcon />} sx={{ color: "white" }} size="large">
          Home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
