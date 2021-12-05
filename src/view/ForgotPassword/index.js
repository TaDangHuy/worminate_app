import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ForgotPassWord() {
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
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPassWord;
