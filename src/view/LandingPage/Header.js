import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BackToTop from "./BackToTop";
import { Box } from "@mui/material";

function Navbar(props) {
  return (
    <>
      <CssBaseline />
      <AppBar color="inherit">
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 30,
              width: 30,
              marginRight: 2,
              marginLeft: 2,
            }}
            src={require("../../assets/images/logo.png").default}
            alt="worminate-token"
          />
          <Typography variant="h6" component="div" sx={{ mr: "20px" }}>
            WORMINATE
          </Typography>
          <Tabs>
            <Tab
              sx={{
                color: "#111",
                ":hover": {
                  color: "primary.main",
                },
              }}
              label="Home"
              href="#hero"
            />
            <Tab
              sx={{
                color: "#111",
                ":hover": {
                  color: "primary.main",
                },
              }}
              label="Features"
              href="#features"
            />
            <Tab
              sx={{
                color: "#111",
                ":hover": {
                  color: "primary.main",
                },
              }}
              label="Token"
              href="#token"
            />
            <Tab
              sx={{
                color: "#111",
                ":hover": {
                  color: "primary.main",
                },
              }}
              label="Team"
              href="#team"
            />
            <Tab
              sx={{
                color: "#111",
                ":hover": {
                  color: "primary.main",
                },
              }}
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
