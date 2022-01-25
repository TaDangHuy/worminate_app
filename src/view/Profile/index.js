import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import ProfileForm from "./ProfileForm";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import PostPart from "./PostPart";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ChangeAvatarButton from "./ChangeAvatarButton/ChangeAvatarButton";
import SimpleDialog from "./SimpleDialog";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";

function Profile() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [favoritesProduct, setFavoritesProduct] = useState([]);
  const [fullName, setFullName] = useState(localStorage.getItem("UserName"));
  const [avatar, setAvatar] = useState({
    path: localStorage.getItem("avatar") ? localStorage.getItem("avatar") : "",
    fileName: "",
  });
  const [createAccountDate, setCreateAccountDate] = useState("");

  const [manageFollowers, setManageFollowers] = useState({
    follow: [],
    followBy: [],
  });
  const [userRank, setUserRank] = useState("");
  const [openFollowing, setOpenFollowing] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/user`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        console.log(response);
        setManageFollowers({ ...response.data.user.manageFollowers });
        setPosts([...response.data.user.postList]);
        setFavoritesProduct([...response.data.user.favoritesProduct]);
        setCreateAccountDate(response.data.user.createdAt);
        setUserRank(response.data.user.userRank);
      })
      .catch((error) => {
        history.push("/login");
        localStorage.clear();
      });
  }, []);

  function renderRank() {
    switch (userRank) {
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
          // alignItems: "center",
          py: 5,
        }}
      >
        <Button
          alignSelf="flex-start"
          sx={{ width: 100 }}
          onClick={history.goBack}
        >
          {/* <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}> */}
          Back
          {/* </Link> */}
        </Button>
        <Stack direction="row">
          <Box
            sx={{
              width: 900,
              background: "white",
              mr: "30px",
              p: "40px",
              pt: "20px",
              boxSizing: "border-box",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5" color="textPrimary" sx={{ mb: "20px" }}>
              General information
            </Typography>
            <ProfileForm
              fullName={fullName}
              avatar={avatar}
              setFullNameProp={(newFullName) => setFullName(newFullName)}
              // setIsChangedAvatarProp={(value) => setIsChangedAvatar(value)}
            />
          </Box>
          <Box
            sx={{
              width: 450,
              height: 490,
              background: "white",
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 200,
                width: "100%",
                // position: "absolute",
              }}
              src={require("../../assets/images/backgroundProfile.jpg").default}
            />
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
                avatar.path === "images/default-profile.jpg"
                  ? require("../../assets/images/logo.png").default
                  : avatar.path
              }
            />
            <Box
              sx={{
                mt: "50px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5">{fullName}</Typography>
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="small"
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    setOpenFollowing(true);
                  }}
                >
                  {manageFollowers.follow.length} Following
                </Typography>

                <SimpleDialog
                  open={openFollowing}
                  data={manageFollowers.follow}
                  removeFollowingByID={(followingId) =>
                    setManageFollowers((old) => ({
                      ...old,
                      follow: old.follow.filter(
                        (e) => e["_id"] !== followingId
                      ),
                    }))
                  }
                  onClose={() => {
                    setOpenFollowing(false);
                  }}
                />

                <Typography
                  variant="small"
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  {manageFollowers.followBy.length} Followers
                </Typography>
              </Stack>

              <Stack sx={{ mt: 1 }}>
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
                  <span>{`Joined : ${createAccountDate.slice(0, 10)}`}</span>
                </Typography>
              </Stack>

              <Box sx={{ mt: "30px", display: "flex", alignItems: "center" }}>
                {/* <Button
                  variant="contained"
                  startIcon={<PersonAddAltIcon />}
                  size="small"
                  sx={{
                    backgroundColor: "rgb(38,43,64)",
                    "&:hover": {
                      backgroundColor: "rgb(38,43,64)",
                    },
                    borderRadius: "10px",
                    marginRight: "13px",
                  }}
                >
                  Connect
                </Button> */}
                <ChangeAvatarButton
                  setAvatarProp={(newAvatarUrl) => setAvatar(newAvatarUrl)}
                />
              </Box>
            </Box>
          </Box>
        </Stack>

        <PostPart
          posts={posts}
          favoritesProduct={favoritesProduct}
          setPostsProp={(newPosts) => setPosts(newPosts)}
        />
      </Box>
    </div>
  );
}

export default Profile;
