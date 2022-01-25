import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function ForgotPassWord() {
  const [value, setValue] = useState("");
  console.log({ value });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mt: 2 }}>
          Forgot Password
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
          onClick={() => console.log(value)}
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPassWord;
