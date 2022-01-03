import * as React from "react";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostCard from "../PostCard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";

export default function PostPart({ posts }) {
  const [value, setValue] = React.useState("1");
  const recentPosts = posts.filter((post) => post.status);
  const soldPosts = posts.filter((post) => !post.status);

  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        minHeight: "433px",
        boxSizing: "border-box",
        pl: "40px",
        mt: "30px",
        borderRadius: "10px",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            aria-label="lab API tabs example"
          >
            <Tab label="All Posts" value="1" />
            <Tab label="Recent Posts" value="2" />
            <Tab label="Sold Post" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            <Grid container spacing={2}>
              {posts.length === 0 ? (
                <Grid item>
                  <Typography>No posts</Typography>
                </Grid>
              ) : (
                posts.map((post, id) => (
                  <Grid item key={id}>
                    <PostCard post={post} id={id} />
                  </Grid>
                ))
              )}
              <Grid item>
                <Button
                  component={Link}
                  to="/post/new"
                  variant="outlined"
                  sx={{ width: 270, height: 340 }}
                >
                  <Stack
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <AddIcon />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontWeight="700"
                    >
                      Create a New Post
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box>
            <Grid container spacing={2}>
              {recentPosts.length === 0 ? (
                <Grid item>
                  <Typography>No posts</Typography>
                </Grid>
              ) : (
                recentPosts.map((post, id) => (
                  <Grid item key={id}>
                    <PostCard post={post} id={id} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box>
            <Grid container spacing={2}>
              {soldPosts.length === 0 ? (
                <Grid item>
                  <Typography>No sold posts</Typography>
                </Grid>
              ) : (
                soldPosts.map((post, id) => (
                  <Grid item key={id}>
                    <PostCard post={post} id={id} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
