import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './helpers.js';
import { getUserRole } from './helpers.js';


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated();

  return (
    <Route {...rest} render={props =>
      (user) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: {from: props.location }
        }}
        />
      )
    }
    />
  )
}
