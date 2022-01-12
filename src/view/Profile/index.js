import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import ProfileForm from "./ProfileForm";
import { Button, Stack, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PostPart from "./PostPart";
import axios from "axios";
import { Link } from "react-router-dom";
import ChangeAvatarButton from "./ChangeAvatarButton/ChangeAvatarButton";
import SimpleDialog from "./SimpleDialog";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";

function Profile() {
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
  // const [openFollowers, setOpenFollowers] = useState(false);
  const [userRank, setUserRank] = useState("");
  const [openFollowing, setOpenFollowing] = useState(false);
  // const [isChangedAvatar, setIsChangedAvatar] = useState(true);

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
        console.log(error);
      });
  }, []);

  function renderRank() {
    switch (userRank) {
      case "S":
        return "Legendary";
      case "A":
        return "Master";
      case "B":
        return "Pro";
      case "C":
        return "Elite";
      default:
        return "Rookie";
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
          width: 1240,
          boxSizing: "border-box",
          m: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          py: 5,
        }}
      >
        <Button alignSelf="flex-start" sx={{ width: 100 }}>
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            Back
          </Link>
        </Button>
        <Stack direction="row">
          <Box
            sx={{
              width: 810,
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
              width: 400,
              height: 450,
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
                width: 400,
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

              <Stack sx={{ mt: 2 }}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StarOutlineIcon fontSize="small" />
                  <span>Rank: {renderRank()}</span>
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <EventNoteIcon fontSize="small" />
                  <span>{`Active Date: ${createAccountDate.slice(
                    0,
                    10
                  )}`}</span>
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

        <PostPart posts={posts} favoritesProduct={favoritesProduct} />
      </Box>
    </div>
  );
}

export default Profile;
