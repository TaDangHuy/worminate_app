import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PostPart from "./PostPart";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";

function ViewProfile() {
  let { idUser } = useParams();
  const [user, setUser] = useState(null);

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
          width: 1240,
          boxSizing: "border-box",
          m: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Button alignSelf="flex-start" sx={{ width: 100 }}>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Back
          </Link>
        </Button>
        <Stack direction="row" spacing={4}>
          <Box
            sx={{
              width: 300,
              height: 450,
              background: "white",
              position: "sticky",
              top: 100,
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
                width: 400,
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
                  <Typography variant="small">
                    {user?.manageFollowers.follow.length || 0} Following
                  </Typography>

                  <Typography variant="small">
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
