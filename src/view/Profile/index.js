import { Button, Stack } from "@mui/material";
import React from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import ProfileCard from "./ProfileCard";
import BasicInfoCard from "./BasicInfoCard";

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
  box_left: {
    backgroundColor: "white",
    borderRadius: 20,
    position: "fixed",
    width: "250px",
    height: "420px",
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
    top: "150px",
    left: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box_right: {
    width: "830px",
    height: "120vh",
    position: "absolute",
    transform: "translateX(50%)",
  },
});
function Profile() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box sx={{ maxWidth: 1400, m: "auto" }}>
        <Box className={classes.box_left} sx={{ px: 2 }}>
          <Stack spacing={2}>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
            <Button fullWidth startIcon={<AccountBoxIcon />}>
              Profile
            </Button>
          </Stack>
        </Box>
        <Box className={classes.box_right} sx={{ px: 2 }}>
          <ProfileCard/>
          <BasicInfoCard/>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
