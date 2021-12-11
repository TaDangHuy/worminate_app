// import * as React from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CopyRight from "../../../../components/CoppyRight";

// const theme = createTheme();

// export default function Login() {
//   const handleSubmit = (event) => {
//     console.log(event);
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 5,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Logo
//           </Typography>

//           <Typography variant="h5" sx={{ mt: 2 }}>
//             Hi, Welcome Back
//           </Typography>

//           <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
//             Enter your credentials to continue
//           </Typography>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In with Google
//           </Button>

//           <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
//             Sign In with FaceBook
//           </Button>

//           <Typography variant="h5" sx={{ mt: 1 }}>
//             OR
//           </Typography>

//           <Typography variant="subtitle1" sx={{ mt: 2 }}>
//             Sign In with Email Address
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>

//         <CopyRight sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Card, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import FormikFormLogin from "./FormikFormLogin";

const useStyles = makeStyles({
  banner: {
    height: "450px",
    width: "100%",
    backgroundColor: "rgb(92,212,201)",
    borderRadius: "20px",
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
  },
  banner_logo: {
    textTransform: "uppercase",
    alignSelf: "flex-start",
  },
  banner_title: {
    textTransform: "capitalize",
  },
  banner_subtitle: {
    width: 600,
    textAlign: "center",
  },
  form_container: {
    height: "610px",
    width: "450px",
    zIndex: 2,
    position: "relative",
    transform: "translateY(-100px)",
  },
  card: {
    padding: "50px 45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signInWithButton: {
    width: "75px",
    height: "75px",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#81E6D9",
    },
  },
  link1: {
    textDecoration: "none",
    color: "white",
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.banner}>
        <Typography
          variant="h5"
          className={classes.banner_logo}
          sx={{ mb: "50px" }}
        >
          <Link to="/" className={classes.link1}>
            Logo-Worminate
          </Link>
        </Typography>
        <Typography
          variant="h3"
          className={classes.banner_title}
          sx={{ fontWeight: "bold", mb: "30px" }}
        >
          Welcome Back !
        </Typography>
        <Typography variant="h6" className={classes.banner_subtitle}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Typography>
      </Box>
      <Box className={classes.form_container}>
        <Card className={classes.card}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: "30px" }}>
            Sign In with
          </Typography>

          <Stack direction="row" spacing={3} sx={{ mb: "30px" }}>
            <Button className={classes.signInWithButton} variant="outlined">
              <GoogleIcon />
            </Button>

            <Button className={classes.signInWithButton} variant="outlined">
              <GitHubIcon />
            </Button>

            <Button className={classes.signInWithButton} variant="outlined">
              <FacebookIcon />
            </Button>
          </Stack>

          <Divider>OR</Divider>

          <Typography variant="subtitle1" sx={{ my: 2 }}>
            Sign In with Email Address
          </Typography>

          <FormikFormLogin />
        </Card>
      </Box>
    </>
  );
};

export default Login;
