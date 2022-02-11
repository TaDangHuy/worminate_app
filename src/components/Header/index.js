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
import AdminTabs from "./AdminTabs";

const StyledInputElement = styled("input")`
  width: 500px;
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

function Navigation({ index, setIndex }) {
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
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
      position="static"
      color="inherit"
      elevation={1}
      sx={{ bgcolor: "#fff", mb: 2 }}
    >
      <Toolbar>
        {localStorage.getItem("isAdmin") === "true" ? (
          <Box
            component="img"
            sx={{
              height: 46,
              width: 41,
              marginRight: 1,
              marginLeft: 1,
              marginTop: -1,
            }}
            src={require("../../assets/images/logo.png").default}
            alt="worminate-token"
          />
        ) : (
          <Link to="/">
            <Box
              component="img"
              sx={{
                height: 46,
                width: 41,
                marginRight: 1,
                marginLeft: 1,
                marginTop: -1,
              }}
              src={require("../../assets/images/logo.png").default}
              alt="worminate-token"
            />
          </Link>
        )}
        {localStorage.getItem("isAdmin") === "true" ? (
          <Typography variant="h6" component="div" sx={{ mr: "20px" }}>
            WORMINATE
          </Typography>
        ) : (
          <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="h6" component="div" sx={{ mr: "20px" }}>
              WORMINATE
            </Typography>
          </Link>
        )}

        {useLocation().pathname === "/admin" && (
          <AdminTabs index={index} setIndex={setIndex} />
        )}
        {localStorage.getItem("isAdmin") !== "true" && (
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
        )}
        <Box sx={{ flexGrow: 1 }} />
        {useLocation().pathname === "/home" && (
          <Link
            to="/main"
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{ height: 39, width: 100, mr: 3, mb: 0.5 }}
              size="small"
            >
              <Typography variant="text">Shop now</Typography>
            </Button>
          </Link>
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
