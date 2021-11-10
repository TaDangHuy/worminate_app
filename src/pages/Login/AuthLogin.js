import { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import AnimateButton from "../../ui-component/extended/AnimateButton";

import Google from "../../assets/images/icons/social-google.svg";

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);

  const googleHandler = async () => {
    console.error("Login");
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            onClick={googleHandler}
            size="large"
            variant="outlined"
            sx={{
              color: "grey.700",
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <img
                src={Google}
                alt="google"
                width={16}
                height={16}
                style={{ marginRight: matchDownSM ? 8 : 16 }}
              />
            </Box>
            Sign in with Google
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

          <Button
            variant="outlined"
            sx={{
              cursor: "unset",
              m: 2,
              py: 0.5,
              px: 7,
              borderColor: `${theme.palette.grey[100]} !important`,
              color: `${theme.palette.grey[900]}!important`,
              fontWeight: 500,
              borderRadius: `${customization.borderRadius}px`,
            }}
            disableRipple
            disabled
          >
            OR
          </Button>

          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            Sign in with Email address
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FirebaseLogin;
