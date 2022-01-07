import {
  Typography,
  InputUnstyled,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import User from "./User";
import { useGetPostsQuery } from "../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { setSearchContent } from "../../features/search/searchSlice";
import { setPosts } from "../../features/posts/postsSlice";
import { setPageIndex } from "../../features/search/searchSlice";

const StyledInputElement = styled("input")`
  width: 600px;
  height: 40px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 01.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  margin-left: 42px;
  margin-right: 25px;
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
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setUserName(localStorage.getItem("UserName"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [userName, isAdmin]);

  const [skip, setSkip] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { data } = useGetPostsQuery(search, {
    skip,
  });

  useEffect(() => {
    if (data && data.posts) dispatch(setPosts(data.posts.docs));
    //eslint-disable-next-line
  }, [data]);

  const path = useLocation().pathname;

  if ((path === "/home" || path.includes("/posts")) && skip === false)
    history.push("/main");

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={3}
      sx={{ bgcolor: "#fff", mb: 2 }}
    >
      <Toolbar>
        <Link to="/">
          <Box
            component="img"
            sx={{
              height: 30,
              width: 30,
              marginRight: 2,
              marginLeft: 2,
            }}
            src={require("../../assets/images/logo.png").default}
            alt="worminate-token"
          />
        </Link>

        <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
          <Typography variant="h6" component="div" sx={{ mr: "20px" }}>
            WORMINATE
          </Typography>
        </Link>

        <CustomInput
          aria-label="Demo input"
          placeholder="Search..."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              dispatch(setSearchContent(event.target.value));
              dispatch(setPageIndex(1));
              setSkip(false);
            }
          }}
        />

        <Box sx={{ flexGrow: 1 }} />
        {useLocation().pathname === "/home" && (
          <Button
            color="primary"
            variant="contained"
            sx={{ height: 39, width: 130, mr: 5, mb: 0.5 }}
          >
            <Link
              to="/main"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <Typography variant="text">Shop now!!</Typography>
            </Link>
          </Button>
          // <Button
          //   variant="contained"
          //   startIcon={<ShoppingCartIcon />}
          //   sx={{ mr: "90px" }}
          // >
          //   <Link
          //     to="/main"
          //     style={{
          //       textDecoration: "none",
          //       color: "white",
          //     }}
          //   >
          //     Shop now!!
          //   </Link>
          // </Button>
        )}
        {/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}

        <User
          userName={userName}
          isAdmin={isAdmin}
          setUserNameProps={(newUserName) => {
            setUserName(newUserName);
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
