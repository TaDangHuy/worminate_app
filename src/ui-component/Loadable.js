import { Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave,
} from "better-react-spinkit";

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        // <Wave
        //   style={{
        //     position: "absolute",
        //     top: "50%",
        //     left: "50%",
        //   }}
        // />
        <Box
          style={{
            position: "absolute",
            top: "46%",
            left: "46.4%",
          }}
        >
          <ThreeBounce
            size={20}
            gutter={15}
            timingFunction="ease"
            color="#3b8767"
          />
        </Box>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
