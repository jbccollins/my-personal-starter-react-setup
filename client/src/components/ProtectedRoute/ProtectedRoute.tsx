// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3
import React from 'react';
import { Redirect, Route } from "react-router-dom";

type Props = {
  component?: any, // TODO: type this correctly
  path: string,
  exact?: boolean
  render?: Function
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {

  const session = false;
  console.log("session", session);
  return (
    <Route
      {...rest}
      render={props =>
        session ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;