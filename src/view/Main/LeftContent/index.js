import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Rating,
  Slider,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Filter from "./Filter";

function LeftContent() {
  const [rangeValue, setRangeValue] = useState([0, 1000]);

  const changeRange = (event, newValue) => {
    setRangeValue(newValue);
  };

  return (
    <Box
      sx={{ ml: 2, pb: 0.5, height: "83%", width: "25%", position: "fixed" }}
    >
      <Card sx={{ height: "100%", px: 2 }} elevation={4}>
        <CardContent>
          <Grid container gridAutoFlow="column" gap={1}>
            <Grid item xs={12}>
              <Filter />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">
                  <Typography variant="subtitle1">Rating</Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={gilad}
                        // onChange={handleChange}
                        name=""
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Rating name="read-only" value={5} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={jason}
                        // onChange={handleChange}
                        name=""
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Rating name="read-only" value={4} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={antoine}
                        // onChange={handleChange}
                        name=""
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Rating name="read-only" value={3} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={antoine}
                        // onChange={handleChange}
                        name=""
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Rating name="read-only" value={2} readOnly />}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={antoine}
                        // onChange={handleChange}
                        name=""
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Rating name="read-only" value={1} readOnly />}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Slider
                sx={{ width: "86%", ml: 1 }}
                getAriaLabel={() => "Temperature range"}
                value={rangeValue}
                onChange={changeRange}
              />
              <Typography variant="subtitle1">
                {"Price from "}
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                >
                  ${rangeValue[0] * 10}
                </Typography>
                {" to "}
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                >
                  ${rangeValue[1] * 10}
                </Typography>{" "}
              </Typography>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField label="Location" />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mx: "9px" }}>
          <Button variant="contained">Apply</Button>
          <Button variant="outlined">Reset</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default LeftContent;
