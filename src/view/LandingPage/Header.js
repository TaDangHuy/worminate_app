import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BackToTop from "./BackToTop";

function Navbar(props) {
  return (
    <>
      <CssBaseline />
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ mr: 3.5 }}>WORMIMATE</Typography>
          <Tabs>
            <Tab sx={{ color: "#f5f5f5" }} label="Home" href="#hero" />
            <Tab sx={{ color: "#f5f5f5" }} label="Features" href="#features" />
            <Tab sx={{ color: "#f5f5f5" }} label="Token" href="#token" />
            <Tab sx={{ color: "#f5f5f5" }} label="Team" href="#team" />
            <Tab
              sx={{ color: "#f5f5f5" }}
              label="Technologies"
              href="#technologies"
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
      <BackToTop props />
    </>
  );
}

export default Navbar;
