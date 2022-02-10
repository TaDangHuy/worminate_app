import React from "react";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { Badge, People, LocalAtm, Done } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMousePointer } from "react-icons/fa";

const data = [
  { country: "Russia", area: 12 },
  { country: "Canada", area: 75 },
  { country: "USA", area: 7 },
  { country: "China", area: 7 },
  { country: "Brazil", area: 6 },
  { country: "Australia", area: 5 },
  { country: "India", area: 2 },
  { country: "Others", area: 55 },
];

function Dashboard() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/admin`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      setStatistics(response.data);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      {statistics && (
        <Grid container spacing={3} sx={{ mt: 6.6 }}>
          <Grid item xs={6}>
            <Paper elevation={4} sx={{ px: 6, py: 2.3 }}>
              <Typography variant="h2">
                {Math.round(statistics.posts.hitCounter.Mean * 100) / 100}
              </Typography>
              <FaMousePointer
                size={18}
                style={{
                  marginLeft: "5px",
                  marginRight: "13px",
                  marginBottom: "5px",
                  display: "inline",
                  color: "#3b8767",
                }}
              />
              <Typography
                color="primary"
                variant="h6"
                sx={{ display: "inline" }}
              >
                Average views in 30 days
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Paper elevation={4} sx={{ px: 6, py: 2 }}>
              <Typography variant="h2">
                {Math.round(statistics.users.salesHistory.Mean * 100) / 100}
              </Typography>
              <Done color="primary" sx={{ mr: 1, mb: 1, display: "inline" }} />{" "}
              <Typography
                color="primary"
                variant="h6"
                sx={{ display: "inline" }}
              >
                Average sold posts per account
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Paper elevation={4} sx={{ px: 6, py: 2 }}>
              <Typography variant="h2">
                {Math.round(statistics.users.ageAccount.Mean * 100) / 100}
              </Typography>
              <Badge color="primary" sx={{ mr: 1, mb: 1, display: "inline" }} />{" "}
              <Typography
                color="primary"
                variant="h6"
                sx={{ display: "inline" }}
              >
                Average age of accounts
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Paper elevation={4} sx={{ px: 6, py: 2.1 }}>
              <Typography variant="h2">
                {Math.round(statistics.users.usedTokens.Mean * 100) / 100}
              </Typography>
              <LocalAtm
                color="primary"
                sx={{ mr: 1, mb: 0.6, display: "inline" }}
              />{" "}
              <Typography
                color="primary"
                variant="h6"
                sx={{ display: "inline" }}
              >
                Average used tokens per account
              </Typography>
            </Paper>
          </Grid>
          {/* <Grid item xs={6}>
            <Paper elevation={4} sx={{ p: 2 }}>
              <Chart data={data}>
                <PieSeries valueField="area" argumentField="country" />
                <Title text="Promotional Plan" />
                <Animation />
              </Chart>
            </Paper>
          </Grid> */}
        </Grid>
      )}
      {statistics ? (
        <Box sx={{ height: "3.4vh" }} />
      ) : (
        <Box sx={{ height: "52.65vh" }} />
      )}
    </Container>
  );
}

export default Dashboard;
