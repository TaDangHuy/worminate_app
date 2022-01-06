import React from "react";
import Box from "@mui/material/Box";
import Map from "../../../components/Map";

function RightContent({ posts, longitude, latitude }) {
  return (
    <Box
      sx={{
        px: 1,
        pb: 0.5,
        ml: -0.5,
        height: "92.5%",
        width: 640,
        position: "relative",
        top: "6.6%",
        left: "1.8%",
      }}
    >
      <Map posts={posts} longitude={longitude} latitude={latitude} />
    </Box>
  );
}

export default RightContent;
