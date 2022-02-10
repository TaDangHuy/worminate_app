import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Posts from "./Posts";
import { Box, Container } from "@mui/material";
import Categories from "./Categories";

function Admin() {
  const [index, setIndex] = useState(0);
  return (
    <Box sx={{ backgroundColor: "#f5f8fb" }}>
      <Header index={index} setIndex={setIndex} />
      {index === 0 ? (
        <Dashboard />
      ) : index === 1 ? (
        <Users />
      ) : index === 2 ? (
        <Posts />
      ) : (
        <Categories />
      )}

      <Footer />
    </Box>
  );
}

export default Admin;
