import * as React from "react";
import { Container, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useGetTopProductsQuery } from "../../api/posts";
import { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";

function Home() {
  const [location, setLocation] = useState([105.8490039, 21.0085042]);
  const [posts, setPosts] = useState([]);
  const { data } = useGetTopProductsQuery(location);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (typeof location === "object")
        setLocation([position.coords.longitude, position.coords.latitude]);
    });
    if (data && data.posts) {
      setPosts(data.posts);
    }

    //eslint-disable-next-line
  }, [data]);

  // if (data && data.posts) {
  //   posts = data.posts.docs;
  // }

  return (
    <Box xs={{ display: "flex" }} sx={{ backgroundColor: "#f5f5f5" }}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <LeftContent posts={posts} />
          </Grid>
          <Grid item xs={6} display="flex" alignItems="flex-start">
            <StickyBox>
              <RightContent
                posts={posts}
                location={location}
                setLocation={setLocation}
              />
            </StickyBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
