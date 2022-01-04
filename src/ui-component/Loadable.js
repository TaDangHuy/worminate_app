import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
