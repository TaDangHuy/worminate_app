import React from "react";
import { useMediaQuery } from "@mui/material";
const Thumb = (props) => {
  const { fileName, src, variant = "normal" } = props;
  const matchWidthBigScreen = useMediaQuery("(min-width:900px)");
  if (!fileName || !src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={fileName}
      style={{
        maxWidth: `${
          variant === "small"
            ? "100px"
            : matchWidthBigScreen
            ? "800px"
            : "350px"
        }`,
        minWidth: `${
          variant === "small"
            ? "100px"
            : matchWidthBigScreen
            ? "700px"
            : "300px"
        }}`,
        padding: `${variant === "small" ? "1px" : "2px"}`,
        backgroundColor: "gray",
        marginLeft: `${variant === "small" ? "0px" : "20px"}`,
        maxHeight: 1000,
      }}
    />
  );
};

export default Thumb;
