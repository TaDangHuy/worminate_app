import { Card, CardContent } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

function ProductCard() {
  return (
    <div>
      <Card>
        <CardContent>
          <Box sx={{ height: 150, bgcolor: "primary.main" }}>product card</Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductCard;
