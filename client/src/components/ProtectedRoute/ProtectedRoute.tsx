// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useTypedSelector } from '@redux/store';
import { Session } from 'types';

type Props = {
  component?: any, // TODO: type this correctly
  path: string,
  exact?: boolean
  render?: Function
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const session: Session | null = useTypedSelector(state => state.session);

  return (
    <Route
      {...rest}
      render={props =>
        session ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login", //?ReturnTo=" + encodeURIComponent(window.location.pathname)
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;