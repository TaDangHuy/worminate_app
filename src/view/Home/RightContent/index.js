import React from "react";
import { Grid, Box } from "@mui/material";
import Map from "../../../components/Map";
import { TextField, IconButton } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

function RightContent({ posts, location, setLocation }) {
  return (
    <Box
      sx={{
        px: 1,
        pb: 0.5,
        ml: -0.5,
        height: "92.5%",
        width: 640,
        position: "relative",
        top: "-1%",
        left: "1.8%",
      }}
    >
      <Grid container direction="column" sx={{ mb: 8 }}>
        <Grid item mb={1}>
          <TextField
            placeholder="Find top products in other places... "
            sx={{ width: "46%", ml: 0.5 }}
            variant="standard"
            size="small"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                setLocation(event.target.value);
              }
            }}
          />
          <IconButton sx={{ mt: -1 }}>
            <LocationOn
              sx={{
                ":hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                  setLocation(
                    `[${position.coords.longitude}, ${position.coords.latitude}]`
                  );
                });
              }}
            />
          </IconButton>
        </Grid>
        <Grid item sx={{ mt: 0.5 }}>
          <Map posts={posts} location={location} height="480px" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RightContent;
