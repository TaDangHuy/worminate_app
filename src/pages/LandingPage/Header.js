import React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import BackToTop from "./BackToTop";

function Navbar(props) {
  const [state, setState] = useState(0);

  const handleClickTab = (e, newState) => {
    setState(newState);
  };

  return (
    <>
      <CssBaseline />
      <AppBar color="primary">
        <Toolbar>
          <Typography>WORMIMATE</Typography>
          <Tabs
            onChange={handleClickTab}
            textColor="inherit"
            value={state}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#fff",
              },
            }}
          >
            <Tab label="Home" />
            <Tab label="Features" />
            <Tab label="Token" />
            <Tab label="Team" />
            <Tab label="Technologies" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Toolbar id="back-to-top-anchor" />
      <BackToTop props />
    </>
  );
}

export default Navbar;
