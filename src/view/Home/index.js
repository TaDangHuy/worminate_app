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

function Home() {
  const [{ longitude, latitude }, setLocation] = useState({
    longitude: 105.8490039,
    latitude: 21.0085042,
  });
  const [posts, setPosts] = useState([]);
  const { data } = useGetTopProductsQuery({ longitude, latitude });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
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
    <Box xs={{ display: "flex" }} sx={{ mt: 10 }}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <LeftContent posts={posts} />
          </Grid>
          <Grid item xs={6}>
            <RightContent
              posts={posts}
              longitude={longitude}
              latitude={latitude}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
