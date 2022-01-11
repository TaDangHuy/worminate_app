import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import PostCard from "../../../components/PostCard";

function LeftContent({ posts }) {
  return (
    <Box
      sx={{
        pl: 1,
        pb: -3.5,

        width: 600,
      }}
    >
      <Grid container direction="column">
        <Grid item mb={0.5} ml={1.5} mt={1.7}>
          <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
            Top Products
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 1.2 }}>
          {/* <Scrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                className="track-horizontal"
                style={{ display: "none" }}
              />
            )}
            renderThumbHorizontal={(props) => (
              <div
                {...props}
                className="thumb-horizontal"
                style={{ display: "none" }}
              />
            )}
            renderTrackVertical={(props) => (
              <div
                {...props}
                className="track-vertical"
                style={{ display: "none" }}
              />
            )}
            renderThumbVertical={(props) => (
              <div
                {...props}
                className="thumb-vertical"
                style={{ display: "none" }}
              />
            )}
          > */}
          {posts.length === 0 && (
            <Typography
              sx={{
                fontSize: 22,
                position: "relative",
                top: "45%",
                left: "26%",
              }}
            >
              No Products Found
            </Typography>
          )}
          <Grid container spacing={3} sx={{ px: 1.2 }}>
            {posts.length > 0 &&
              posts.map((post, i) => (
                <Grid item sx={4}>
                  <PostCard post={post} index={i} key={{ i }} />
                </Grid>
              ))}
          </Grid>
          {/* </Scrollbars> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeftContent;
