import React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";

function LeftContent() {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
      }}
    >
      <Card sx={{ width: "90%", height: 680 }}>
        <CardContent>this is map.</CardContent>
      </Card>
    </Box>
  );
}

export default LeftContent;
