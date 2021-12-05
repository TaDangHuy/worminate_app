import { Suspense } from "react";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
