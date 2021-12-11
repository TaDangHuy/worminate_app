import React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import MatGeocoder from "react-mui-mapbox-geocoder";

function LeftContent() {
  const geocoderApiOptions = {
    // country: "vnm"
    // proximity: { longitude: -121.0681, latitude: 38.9197 },
    // bbox: [-123.8501, 38.08, -117.5604, 39.8735],
  };

  const onSelectHandler = (result) => {
    // Go to result handler.
  };

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaHV1YmluaCIsImEiOiJja3V6ZmFkbTMwMGpnMm9xc2tldGxnMXp3In0.HiID1TqQ9YH8QHEFB6xjFg";
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
        <CardContent>
          <MatGeocoder
            inputPlaceholder="Search Address"
            accessToken={MAPBOX_TOKEN}
            onSelect={onSelectHandler}
            showLoader={true}
            {...geocoderApiOptions}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default LeftContent;
