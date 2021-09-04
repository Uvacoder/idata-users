import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../context";

export interface IPrivateRoute {
    children: React.ReactNode;
    path: string;
} 

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;