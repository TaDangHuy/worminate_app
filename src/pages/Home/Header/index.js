import { Divider, Typography, InputUnstyled, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import User from "./User";

const StyledInputElement = styled("input")`
  width: 300px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

function Navigation() {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ mr: "20px" }}>
        LogoIcon, Logo
      </Typography>
      <CustomInput aria-label="Demo input" placeholder="Search..." />

      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" startIcon={<ShoppingCartIcon />}>
        <Link to="/main">Shop now!!</Link>
      </Button>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <User />
    </>
  );
}

export default Navigation;
