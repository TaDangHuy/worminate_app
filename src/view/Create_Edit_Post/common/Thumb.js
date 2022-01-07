import React from "react";

const Thumb = (props) => {
  const { fileName, src } = props;
  if (!fileName || !src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={fileName}
      style={{
        maxWidth: "200px",
        minWidth: "50px",
        padding: "1px",
        backgroundColor: "gray",
        marginLeft: "20px",
        maxHeight: 1000,
      }}
    />
  );
};

export default Thumb;
