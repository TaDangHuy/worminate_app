import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box
      sx={{
        height: "70px",
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Worminate
        </Link>
      </Typography>
      <Typography variant="h6">Search box</Typography>
      <Typography variant="h6">User part</Typography>
    </Box>
  );
}

export default Header;
