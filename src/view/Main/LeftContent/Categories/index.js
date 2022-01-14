import React, { useEffect } from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetCategoryQuery } from "../../../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../../features/search/searchSlice";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 204,
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

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState(null);
  const category = useSelector((state) => state.search.category);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (category) => {
    setAnchorEl(null);
    if (category) {
      dispatch(setCategory(category));
    }
  };

  const [categories, setCategories] = useState([]);
  const { data, isLoading } = useGetCategoryQuery();

  useEffect(() => {
    if (data) {
      setCategories(data.category);
    }
    //eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <Button
        id="customized-button"
        aria-controls="customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ width: 204, height: "39px", fontSize: "13.25px" }}
      >
        {category}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("All categories")} disableRipple>
          All categories
        </MenuItem>

        {!isLoading &&
          categories.map((item, i) => (
            <MenuItem onClick={() => handleClose(item.name)} disableRipple>
              {item.name}
            </MenuItem>
          ))}
      </StyledMenu>
    </div>
  );
}
