import React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { LocalAtm, Sell, Done, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

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
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) {
      if (value === 0) {
      } else if (value === 2) {
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
      } else if (value === 3) {
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
      } else if (value === 4) {
      }
    }
  };

  return (
    <div>
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
              <MenuItem onClick={() => handleClose(0)} disableRipple>
                <Edit fontSize="large" sx={{ mb: 0.3 }} /> Edit post
              </MenuItem>
            </Link>
            <MenuItem onClick={() => handleClose(1)} disableRipple>
              <LocalAtm fontSize="large" sx={{ mb: 0.3 }} />
              Push post
            </MenuItem>
            <MenuItem onClick={() => handleClose(2)} disableRipple>
              <Done fontSize="large" sx={{ mb: 0.3 }} /> Mark as sold
            </MenuItem>
            <MenuItem onClick={() => handleClose(4)} disableRipple>
              <Delete fontSize="large" sx={{ mb: 0.3 }} />
              Delete post
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleClose(3)} disableRipple>
            <Sell fontSize="large" sx={{ mb: 0.3 }} /> Mark as for sale
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
