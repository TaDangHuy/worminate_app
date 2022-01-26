import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Box } from "@mui/material";

function Navbar({ index, setIndex }) {
  return (
    <>
      <CssBaseline />

      <Toolbar>
        <Tabs>
          <Tab
            sx={{
              color: "#111",
              ":hover": {
                color: "primary.main",
              },
            }}
            label="Dashboard"
            onClick={() => setIndex(0)}
          />
          <Tab
            sx={{
              color: "#111",
              ":hover": {
                color: "primary.main",
              },
            }}
            label="Users"
            onClick={() => setIndex(1)}
          />
          <Tab
            sx={{
              color: "#111",
              ":hover": {
                color: "primary.main",
              },
            }}
            label="Products"
            onClick={() => setIndex(2)}
          />
          <Tab
            sx={{
              color: "#111",
              ":hover": {
                color: "primary.main",
              },
            }}
            label="Categories"
            onClick={() => setIndex(3)}
          />
        </Tabs>
      </Toolbar>
    </>
  );
}

export default Navbar;
