import { Button, Stack } from "@mui/material";
import React from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgb(247,250,252)",
    position: "relative",
  },
  box_left: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    border: "1px solid red",
    position: "fixed",
  },
  box_right: {
    backgroundColor: "red",
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
          right
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
