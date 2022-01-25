import { Suspense } from "react";
import { Box } from "@mui/material";
import { ThreeBounce } from "better-react-spinkit";

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
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
