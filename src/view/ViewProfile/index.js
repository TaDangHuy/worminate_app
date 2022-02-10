import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PostPart from "./PostPart";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Report } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import SnackbarCustom from "../../components/SnackbarCustom";

function ViewProfile() {
  const history = useHistory();
  let { idUser } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `/user/${idUser}`,
    })
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderRank() {
    switch (user?.userRank) {
      case "S":
        return (
          <>
            <Avatar
              alt="Elite"
              src={require("../../assets/images/rank/legendary.jpg").default}
              sx={{ width: "60px", height: "60px" }}
            />
            <span style={{ fontFamily: "The Nautigal", fontSize: "30px" }}>
              Legendary
            </span>
          </>
        );
      case "A":
        return (
          <>
            <Avatar
              alt="Elite"
              src={require("../../assets/images/rank/master.jpg").default}
              sx={{ width: "60px", height: "60px" }}
            />
            <span style={{ fontFamily: "The Nautigal", fontSize: "30px" }}>
              Master
            </span>
          </>
        );
      case "B":
        return (
          <>
            <Avatar
              alt="Elite"
              src={require("../../assets/images/rank/pro.jpg").default}
              sx={{ width: "60px", height: "60px" }}
            />
            <span style={{ fontFamily: "The Nautigal", fontSize: "30px" }}>
              Pro
            </span>
          </>
        );
      case "C":
        return (
          <>
            <Avatar
              alt="Elite"
              src={require("../../assets/images/rank/elite.jpg").default}
              sx={{ width: "60px", height: "60px" }}
            />
            <span style={{ fontFamily: "The Nautigal", fontSize: "30px" }}>
              Elite
            </span>
          </>
        );
      default:
        return (
          <>
            <Avatar
              alt="Elite"
              src={require("../../assets/images/rank/rookie-i.png").default}
              sx={{ width: "60px", height: "60px" }}
            />
            <span style={{ fontFamily: "The Nautigal", fontSize: "30px" }}>
              Rookie
            </span>
          </>
        );
    }
  }

  return (
    <div
      style={{
        background: "#f5f8fb",
        width: "100%",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          width: 1380,
          boxSizing: "border-box",
          m: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Button
          // alignSelf="flex-start"
          onClick={history.goBack}
          sx={{ width: 100, mt: 0 }}
        >
          Back
        </Button>
        <Stack direction="row" spacing={4}>
          <Box
            sx={{
              width: 370,
              height: 530,
              background: "white",
              position: "sticky",
              top: 20,
              bottom: 20,
              borderRadius: "10px",
              overflow: "hidden",
              zIndex: 5,
            }}
          >
            <Box
              component="img"
              sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 200,
                width: 370,
              }}
              src={require("../../assets/images/backgroundProfile.jpg").default}
            />
            {user ? (
              <Box
                component="img"
                sx={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 150,
                  width: 150,
                  left: "50%",
                  top: 200,
                  transform: `translate(${-50}%, ${-70}%)`,
                  borderRadius: "50%",
                  position: "absolute",
                }}
                src={
                  user.image.path === "images/default-profile.jpg"
                    ? require("../../assets/images/logo.png").default
                    : user.image.path
                }
              />
            ) : (
              <Skeleton
                variant="circular"
                width={150}
                height={150}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: 200,
                  transform: `translate(${-50}%, ${-70}%)`,
                }}
              />
            )}
            <Box
              sx={{
                mt: "50px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {user ? (
                <Typography variant="h5">{user?.fullName}</Typography>
              ) : (
                <Skeleton width={150} />
              )}
              {user ? (
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ fontSize: "14px" }}>
                    {user?.manageFollowers.follow.length || 0} Following
                  </Typography>

                  <Typography sx={{ fontSize: "14px" }}>
                    {user?.manageFollowers.followBy.length || 0} Followers
                  </Typography>
                </Stack>
              ) : (
                <Skeleton width={200} />
              )}

              {user ? (
                <Stack sx={{ mt: 2 }}>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StarOutlineIcon fontSize="small" />
                    <Typography>
                      <Stack direction="row" alignItems="center">
                        {"Rank:  "}
                        {renderRank()}
                      </Stack>
                    </Typography>
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <EventNoteIcon fontSize="small" />
                    <span>{`Joined: ${user?.createdAt.slice(0, 10)}`}</span>
                  </Typography>
                </Stack>
              ) : (
                <Stack sx={{ mt: 2 }}>
                  <Skeleton width={100} />
                  <Skeleton width={200} />
                </Stack>
              )}

              {user ? (
                <Typography variant="h6" sx={{ my: 3, color: "#3B8767" }}>
                  Contact: {user?.email}
                </Typography>
              ) : (
                <Skeleton width={150} />
              )}

              {token ? (
                user ? (
                  <Button
                    startIcon={<Report sx={{ mb: 0.2 }} />}
                    variant="outlined"
                    color="error"
                    // size="small"
                    sx={{ mt: 0 }}
                    onClick={() => {
                      setOpenDialog(true);
                    }}
                  >
                    Report
                  </Button>
                ) : (
                  <Skeleton width={150} />
                )
              ) : (
                ""
              )}

              <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
                <DialogTitle>
                  <Typography variant="h4" sx={{}}>
                    Report user
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <Typography variant="subtitle1" sx={{}}>
                    Do you really want to report this user?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  {loading ? (
                    <Box sx={{ px: 3, mt: 1 }}>
                      <CircularProgress size={20} />
                    </Box>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setOpenDialog(false);
                        }}
                      >
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          setLoading(true);
                          axios({
                            method: "POST",
                            url: `user/report`,
                            headers: { Authorization: `Bearer ${token}` },
                            data: { userId: idUser },
                          })
                            .then((response) => {
                              setLoading(false);
                              setOpenDialog(false);
                              setSnackbarProps({
                                severity: "success",
                                message: "User was reported successfully",
                              });
                              setOpenSnackbar(true);
                            })
                            .catch((error) => {
                              setLoading(false);
                              setOpenDialog(false);
                              setSnackbarProps({
                                severity: "error",
                                message: "Failed to report user",
                              });
                              setOpenSnackbar(true);
                            });
                        }}
                      >
                        Yes
                      </Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>

              <SnackbarCustom
                openSnackbarProp={openSnackbar}
                setOpenSnackbarProp={(value) => {
                  setOpenSnackbar(value);
                }}
                snackbarprops={snackbarprops}
              />
              {/* <Box sx={{ mt: "30px", display: "flex", alignItems: "center" }}>
                {user ? (
                  <></>
                ) : (
                  // <Button
                  //   variant="contained"
                  //   startIcon={<PersonAddAltIcon />}
                  //   size="small"
                  //   sx={{
                  //     backgroundColor: "rgb(38,43,64)",
                  //     "&:hover": {
                  //       backgroundColor: "rgb(38,43,64)",
                  //     },
                  //     borderRadius: "10px",
                  //     marginRight: "13px",
                  //   }}
                  // >
                  //   Connect
                  // </Button>
                  <Skeleton width={100} height={50} />
                )}
              </Box> */}
            </Box>
          </Box>
          {user ? (
            <PostPart posts={user.postList} />
          ) : (
            <Skeleton
              sx={{ height: 433, width: 950 }}
              animation="wave"
              variant="rectangular"
            />
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default ViewProfile;
