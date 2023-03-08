import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './helpers.js';
import { getUserRole } from './helpers.js';


export const AdminRoute = ({ component: Component, ...rest }) => {
  const user = getUserRole();
  return (
    <Route {...rest} render={props =>
        (user && user.role == 'ADMIN') ? (
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
