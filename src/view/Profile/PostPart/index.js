import React, { useEffect } from "react";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, Pagination, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostCard from "../PostCard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import { useState } from "react";

function CustomPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
export default function PostPart({ posts, favoritesProduct, setPostsProp }) {
  const [value, setValue] = useState("1");
  const [recentPosts, setRecentPosts] = useState([]);
  const [soldPosts, setSoldPosts] = useState([]);

  useEffect(() => {
    setRecentPosts(posts.filter((post) => post.status));
    setSoldPosts(posts.filter((post) => !post.status));
  }, [posts]);

  const [pageAll, setPageAll] = useState(1);
  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        minHeight: "797px",
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
            <Tab label={`All Posts(${posts.length})`} value="1" />
            <Tab label={`Recent Posts(${recentPosts.length})`} value="2" />
            <Tab label={`Sold Post(${soldPosts.length})`} value="3" />
            <Tab
              label={`Favorite Post(${favoritesProduct.length})`}
              value="4"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div>
            {posts.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 659 }}>
                  {Array.from(Array(Math.ceil(posts.length / 8)).keys()).map(
                    (num) => (
                      <CustomPanel value={pageAll} index={num + 1}>
                        <Grid container spacing={2}>
                          {num ? (
                            posts
                              .slice(num * 8, num * 8 + 8)
                              .map((post, id) => {
                                return (
                                  <Grid item key={num * 8 + id}>
                                    <PostCard post={post} id={num * 8 + id} />
                                  </Grid>
                                );
                              })
                          ) : (
                            <>
                              <Grid item>
                                <Button
                                  component={Link}
                                  to="/posts/new"
                                  variant="outlined"
                                  sx={{ width: 270, height: 308 }}
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
                              {posts
                                .slice(num * 8, num * 8 + 7)
                                .map((post, id) => {
                                  return (
                                    <Grid item key={num * 8 + id}>
                                      <PostCard post={post} id={num * 8 + id} />
                                    </Grid>
                                  );
                                })}
                            </>
                          )}
                        </Grid>
                      </CustomPanel>
                    )
                  )}
                </Box>
                <Box
                  sx={{
                    pt: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={Math.ceil(posts.length / 8)}
                    page={pageAll}
                    onChange={(event, newValue) => {
                      setPageAll(newValue);
                    }}
                  />
                </Box>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div>
            {recentPosts.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No recent posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 659 }}>
                  {Array.from(
                    Array(Math.ceil(recentPosts.length / 8)).keys()
                  ).map((num) => (
                    <CustomPanel value={pageAll} index={num + 1}>
                      <Grid container spacing={2}>
                        {recentPosts
                          .slice(num * 8, num * 8 + 8)
                          .map((post, id) => {
                            return (
                              <Grid item key={num * 8 + id}>
                                <PostCard
                                  post={post}
                                  id={num * 8 + id}
                                  setRecentPostsProp={(newPosts) =>
                                    setRecentPosts(newPosts)
                                  }
                                  setSoldPostsProp={(newPosts) =>
                                    setSoldPosts(newPosts)
                                  }
                                  setPostsProp={setPostsProp}
                                  type="recent"
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </CustomPanel>
                  ))}
                  <Box
                    sx={{
                      pt: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      count={Math.ceil(recentPosts.length / 8)}
                      page={pageAll}
                      onChange={(event, newValue) => {
                        setPageAll(newValue);
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div>
            {soldPosts.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No sold posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 659 }}>
                  {Array.from(
                    Array(Math.ceil(soldPosts.length / 8)).keys()
                  ).map((num) => (
                    <CustomPanel value={pageAll} index={num + 1}>
                      <Grid container spacing={2}>
                        {soldPosts
                          .slice(num * 8, num * 8 + 8)
                          .map((post, id) => {
                            return (
                              <Grid item key={num * 8 + id}>
                                <PostCard
                                  post={post}
                                  id={num * 8 + id}
                                  setRecentPostsProp={(newPosts) =>
                                    setRecentPosts(newPosts)
                                  }
                                  setSoldPostsProp={(newPosts) =>
                                    setSoldPosts(newPosts)
                                  }
                                  type="sold"
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </CustomPanel>
                  ))}
                </Box>
                <Box
                  sx={{
                    pt: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={Math.ceil(soldPosts.length / 8)}
                    page={pageAll}
                    onChange={(event, newValue) => {
                      setPageAll(newValue);
                    }}
                  />
                </Box>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel value="4">
          <div>
            {favoritesProduct.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No favorite posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 659 }}>
                  {Array.from(
                    Array(Math.ceil(favoritesProduct.length / 8)).keys()
                  ).map((num) => (
                    <CustomPanel value={pageAll} index={num + 1}>
                      <Grid container spacing={2}>
                        {favoritesProduct
                          .slice(num * 8, num * 8 + 8)
                          .map((post, id) => {
                            return (
                              <Grid item key={num * 8 + id}>
                                <PostCard
                                  post={post}
                                  id={num * 8 + id}
                                  type="favorite"
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </CustomPanel>
                  ))}
                  <Box sx={{ pt: "20px" }}>
                    <Pagination
                      count={Math.ceil(favoritesProduct.length / 8)}
                      page={pageAll}
                      onChange={(event, newValue) => {
                        setPageAll(newValue);
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
