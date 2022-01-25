import React from "react";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Grid, Paper } from "@mui/material";

const data = [
  { country: "Russia", area: 12 },
  { country: "Canada", area: 7 },
  { country: "USA", area: 7 },
  { country: "China", area: 7 },
  { country: "Brazil", area: 6 },
  { country: "Australia", area: 5 },
  { country: "India", area: 2 },
  { country: "Others", area: 55 },
];

function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <Chart data={data}>
            <PieSeries valueField="area" argumentField="country" />
            <Title text="Promotional Plan" />
            <Animation />
          </Chart>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Chart data={data}>
            <PieSeries valueField="area" argumentField="country" />
            <Title text="Promotional Plan" />
            <Animation />
          </Chart>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Chart data={data}>
            <PieSeries valueField="area" argumentField="country" />
            <Title text="Promotional Plan" />
            <Animation />
          </Chart>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Chart data={data}>
            <PieSeries valueField="area" argumentField="country" />
            <Title text="Promotional Plan" />
            <Animation />
          </Chart>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
