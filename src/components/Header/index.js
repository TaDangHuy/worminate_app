import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

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
      <Typography variant="h6">Worminate</Typography>
      <Typography variant="h6">Search box</Typography>
      <Typography variant="h6">User part</Typography>
    </Box>
  );
}

export default Header;
