import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import HomeRounded from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({}));
function HeroSection() {
  return (
    <div>
      <Paper></Paper>

      <Button startIcon={<HomeRounded />} variant="contained" color="primary">
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Hello
        </Link>
      </Button>
    </div>
  );
}

export default HeroSection;
