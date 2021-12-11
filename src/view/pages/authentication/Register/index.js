// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CopyRight from "../../../../components/CoppyRight";

// const theme = createTheme();

// export default function Register() {
//   const handleSubmit = (event) => {
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
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="fullname"
//                   label="Full Name"
//                   name="fullname"
//                   autoComplete="fullname"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <CopyRight sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
import React from "react";
import { Box } from "@mui/system";
import { Typography, Card } from "@mui/material";

import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import FormikFormRegister from "./FormikFormRegister";

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
  link1: {
    textDecoration: "none",
    color: "white",
  },
});

const Register = () => {
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
          Welcome
        </Typography>
        <Typography variant="h6" className={classes.banner_subtitle}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Typography>
      </Box>
      <Box className={classes.form_container}>
        <Card className={classes.card}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: "30px" }}>
            Register
          </Typography>

          <FormikFormRegister />
        </Card>
      </Box>
    </>
  );
};

export default Register;
