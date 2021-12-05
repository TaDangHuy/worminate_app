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
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LeftContent() {
  return (
    <Card>
      <CardContent>
        <Grid container gridAutoFlow="column" gap={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Categories</Typography>
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Typography variant="subtitle1" component="span">
                  Category
                </Typography>
                <Typography variant="subtitle2" component="span">
                  num
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Typography variant="subtitle1" component="span">
                  Category
                </Typography>
                <Typography variant="subtitle2" component="span">
                  num
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Typography variant="subtitle1" component="span">
                  Category
                </Typography>
                <Typography variant="subtitle2" component="span">
                  num
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Typography variant="subtitle1" component="span">
                  Category
                </Typography>
                <Typography variant="subtitle2" component="span">
                  num
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">
                <Typography variant="h6">Brands</Typography>
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
                  label="Filtre by brand item"
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
                  label="Filtre by brand item"
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
                  label="Filtre by brand item"
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
                  label="Filtre by brand item"
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
                  label="Filtre by brand item"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">
                <Typography variant="h6">Rating</Typography>
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
            <Typography variant="h6">Price</Typography>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={[30, 40]}
              // onChange={handleChange}
              valueLabelDisplay="auto"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <FormHelperText id="outlined-weight-helper-text">
                    Min
                  </FormHelperText>
                  <OutlinedInput />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined">
                  <FormHelperText id="outlined-weight-helper-text">
                    Max
                  </FormHelperText>
                  <OutlinedInput />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ mx: "9px" }}>
        <Button variant="contained">Apply</Button>
        <Button variant="outlined">Reset</Button>
      </CardActions>
    </Card>
  );
}

export default LeftContent;
