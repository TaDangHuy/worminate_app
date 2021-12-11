import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    padding: "20px 20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const AuthenLayout = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Outlet />
    </Box>
  );
};

export default AuthenLayout;
