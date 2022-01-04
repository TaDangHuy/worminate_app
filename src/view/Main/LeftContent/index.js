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
  Stack,
  Typography,
  FormHelperText,
  OutlinedInput,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import Filter from "./Filter";
import { LocationOn } from "@mui/icons-material";

function LeftContent() {
  const [rating, setRating] = useState(0);
  const [rangeValue, setRangeValue] = useState([0, 1000]);
  const [distance, setDistance] = useState(50);
  return (
    <Box
      sx={{ ml: 2, pb: 0.5, height: "83%", width: "25%", position: "fixed" }}
    >
      <Card sx={{ height: "100%", p: 2, borderRadius: 3 }} elevation={4}>
        <CardContent>
          <Grid container gridAutoFlow="column" gap={3}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Filter />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Rating</Typography>
              <Rating
                sx={{ position: "absolute", top: "19.6%", left: "28%" }}
                name="read-only"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
              {/* <FormControl component="fieldset" variant="standard">
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
              </FormControl> */}
            </Grid>
            <Grid item xs={12}>
              <Slider
                sx={{ width: "86%" }}
                getAriaLabel={() => "Temperature range"}
                value={rangeValue}
                onChange={(event, newValue) => setRangeValue(newValue)}
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
            </Grid>
            <Grid item xs={12} sx={{}}>
              <TextField label="Location" variant="standard" />
              <IconButton sx={{ mt: 1.5 }}>
                <LocationOn
                  sx={{
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Slider
                sx={{ width: "90%" }}
                value={distance}
                onChange={(event, newDistance) => setDistance(newDistance)}
              />
              <Typography variant="subtitle1">
                {"Around "}
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="span"
                >
                  {distance}km
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mx: "9px" }}>
          <Button variant="contained" size="small">
            Apply
          </Button>
          <Button variant="outlined" size="small">
            Reset
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default LeftContent;
