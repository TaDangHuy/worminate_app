import * as React from "react";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Pagination } from "@mui/material";
import PostCard from "../PostCard";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
export default function PostPart({ posts }) {
  const [value, setValue] = useState("1");
  const recentPosts = posts.filter((post) => post.status);
  const soldPosts = posts.filter((post) => !post.status);
  const [pageAll, setPageAll] = useState(1);
  return (
    <Box
      sx={{
        background: "white",
        width: "980px",
        minHeight: "995px",
        boxSizing: "border-box",
        pl: "40px",
        borderRadius: "10px",
      }}
    >
      <TabContext value={value} sx={{}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", ml: -4.9 }}>
          <TabList
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            aria-label="lab API tabs example"
          >
            <Tab label={`All Posts(${posts.length})`} value="1" />
            <Tab label={`Recent Posts(${recentPosts.length})`} value="2" />
            <Tab label={`Sold Posts(${soldPosts.length})`} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div>
            {posts.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No Posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 858 }}>
                  {Array.from(Array(Math.ceil(posts.length / 12)).keys()).map(
                    (num) => (
                      <CustomPanel value={pageAll} index={num + 1}>
                        <Grid container spacing={2}>
                          {posts
                            .slice(num * 12, num * 12 + 12)
                            .map((post, id) => {
                              return (
                                <Grid item key={num * 12 + id}>
                                  <PostCard post={post} id={num * 12 + id} />
                                </Grid>
                              );
                            })}
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
                    count={Math.ceil(posts.length / 12)}
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
                  <Typography>No Recent Posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 858 }}>
                  {Array.from(
                    Array(Math.ceil(recentPosts.length / 12)).keys()
                  ).map((num) => (
                    <CustomPanel value={pageAll} index={num + 1}>
                      <Grid container spacing={2}>
                        {recentPosts
                          .slice(num * 12, num * 12 + 12)
                          .map((post, id) => {
                            return (
                              <Grid item key={num * 12 + id}>
                                <PostCard post={post} id={num * 12 + id} />
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
                    count={Math.ceil(recentPosts.length / 12)}
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
        <TabPanel value="3">
          <div>
            {soldPosts.length === 0 ? (
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>No Sold Posts</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ height: 858 }}>
                  {Array.from(
                    Array(Math.ceil(soldPosts.length / 12)).keys()
                  ).map((num) => (
                    <CustomPanel value={pageAll} index={num + 1}>
                      <Grid container spacing={2}>
                        {soldPosts
                          .slice(num * 12, num * 12 + 12)
                          .map((post, id) => {
                            return (
                              <Grid item key={num * 12 + id}>
                                <PostCard post={post} id={num * 12 + id} />
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
                    count={Math.ceil(soldPosts.length / 12)}
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
      </TabContext>
    </Box>
  );
}
