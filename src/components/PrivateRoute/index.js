import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, propsP, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        // authorized so return component
        return <Component {...propsP} {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
