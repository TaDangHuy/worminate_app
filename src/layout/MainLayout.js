import { Breadcrumbs, Box, CssBaseline } from "@mui/material";

import React from "react";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "rgb(247,250,252)",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Header />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/main">
          Homepage
        </Link>
        <Link underline="hover" color="inherit" href="/main">
          Fruit and vegetables
        </Link>
      </Breadcrumbs>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
