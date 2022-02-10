import React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalAtm, Sell, Done, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useHistory } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({
  status,
  setStatus,
  idPost,
  token,
  url,
  setOpenPromotionDialog,
}) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) {
      if (value === 4) {
        setOpenPromotionDialog(true);
      } else if (value === 1) {
        axios({
          method: "POST",
          url: `posts/${idPost}/sale`,
          headers: { Authorization: `Bearer ${token}` },
          data: {
            sale: false,
          },
        }).then((response) => {
          setStatus(false);
        });
      } else if (value === 2) {
        axios({
          method: "POST",
          url: `posts/${idPost}/sale`,
          headers: { Authorization: `Bearer ${token}` },
          data: {
            sale: true,
          },
        }).then((response) => {
          setStatus(true);
        });
      } else if (value === 3) {
        setOpenDialog(true);
      }
    }
  };

  return (
    <>
      <Tooltip title="Manage post" placement="left">
        <IconButton
          onClick={handleClick}
          sx={{
            ":hover": {
              color: "primary.main",
            },
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Tooltip>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        {status ? (
          <>
            <Link
              to={`${url}/edit`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem onClick={() => handleClose()} disableRipple>
                <Edit fontSize="large" sx={{ mb: 0.3 }} /> Edit post
              </MenuItem>
            </Link>
            <MenuItem onClick={() => handleClose(4)} disableRipple>
              <LocalAtm fontSize="large" sx={{ mb: 0.3 }} />
              Push post
            </MenuItem>
            <MenuItem onClick={() => handleClose(1)} disableRipple>
              <Done fontSize="large" sx={{ mb: 0.3 }} /> Mark as sold
            </MenuItem>
            <MenuItem onClick={() => handleClose(3)} disableRipple>
              <Delete fontSize="large" sx={{ mb: 0.3 }} />
              Delete post
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleClose(2)} disableRipple>
            <Sell fontSize="large" sx={{ mb: 0.3 }} /> Mark as for sale
          </MenuItem>
        )}
      </StyledMenu>
      <Dialog open={openDialog} sx={{ borderRadius: 3 }}>
        <DialogTitle>
          <Typography variant="h4" sx={{}}>
            Delete post
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{}}>
            Do you really want to delete this post?
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
                    method: "DELETE",
                    url: `posts/${idPost}`,
                    headers: { Authorization: `Bearer ${token}` },
                    data: {},
                  }).then((response) => {
                    history.push("/main");
                  });
                }}
              >
                Yes
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
