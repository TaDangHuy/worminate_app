import React from "react";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { People } from "@mui/icons-material";

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
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={4}>
            <People />
            <Typography variant="h3">12345</Typography>

            <Typography variant="h6">new users today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <Paper elevation={4}>
            <Typography variant="h3">12345</Typography>
            <Typography>new users today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <Paper elevation={4}>
            <Typography variant="h3">12345</Typography>
            <Typography>new users today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <Paper elevation={4}>
            <Typography variant="h3">12345</Typography>
            <Typography>new users today</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Chart data={data}>
              <PieSeries valueField="area" argumentField="country" />
              <Title text="Promotional Plan" />
              <Animation />
            </Chart>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Chart data={data}>
              <PieSeries valueField="area" argumentField="country" />
              <Title text="Promotional Plan" />
              <Animation />
            </Chart>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Chart data={data}>
              <PieSeries valueField="area" argumentField="country" />
              <Title text="Promotional Plan" />
              <Animation />
            </Chart>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Chart data={data}>
              <PieSeries valueField="area" argumentField="country" />
              <Title text="Promotional Plan" />
              <Animation />
            </Chart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
