import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

function ChangeAvatarButton({ setAvatarProp }) {
  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      updateAvatar(files[i]);
    }
  }
  function updateAvatar(file) {
    const url = `https://api.cloudinary.com/v1_1/de8woxbuj/upload`;
    const fd = new FormData();

    fd.append("upload_preset", "j2xlmxdo");
    fd.append("tags", "browser_upload");
    fd.append("file", file);

    axios
      .post(url, fd)
      .then((res) => {
        let path = res.data["secure_url"];
        let fileName = res.data.public_id;
        setAvatarProp({ path, fileName });
      })
      .catch((err) => console.log(err));
  }
  return (
    <Button
      variant="contained"
      size="small"
      component="label"
      sx={{
        // backgroundColor: "rgb(97,218,251)",
        // "&:hover": {
        //   backgroundColor: "rgb(97,218,251)",
        // },
        borderRadius: "10px",
      }}
      color="primary"
    >
      Change Avatar
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </Button>
  );
}

export default ChangeAvatarButton;
