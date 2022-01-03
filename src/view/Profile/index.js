import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import ProfileForm from "./ProfileForm";
import { Button, Stack, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PostPart from "./PostPart";
import axios from "axios";
import { Link } from "react-router-dom";
import ChangeAvatarButton from "./ChangeAvatarButton/ChangeAvatarButton";

const token = localStorage.getItem("token");
const id = localStorage.getItem("_id");

function Profile() {
  const [posts, setPosts] = useState([]);
  const [fullName, setFullName] = useState(localStorage.getItem("UserName"));
  const [avatar, setAvatar] = useState({
    path: localStorage.getItem("avatar") ? localStorage.getItem("avatar") : "",
    fileName: "",
  });
  // const [isChangedAvatar, setIsChangedAvatar] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/user/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setPosts([...response.data.posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                avatar.path
                  ? avatar.path
                  : require("../../assets/images/default.png").default
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
              <Typography variant="subtitle1">user</Typography>

              <Box sx={{ mt: "30px", display: "flex", alignItems: "center" }}>
                <Button
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
                </Button>
                <ChangeAvatarButton
                  setAvatarProp={(newAvatarUrl) => setAvatar(newAvatarUrl)}
                />
              </Box>
            </Box>
          </Box>
        </Stack>

        <PostPart posts={posts} />
      </Box>
    </div>
  );
}

export default Profile;
