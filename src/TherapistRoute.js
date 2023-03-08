import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserRole } from './helpers.js';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const TherapistRoute = ({ component: Component, ...rest }) => {
  // const user = getUserRole();
  const user = cookie.get('user')

  return (
    <Route {...rest} render={props =>
      (user && user.role === "THERAPIST") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}
        />
      )
    }
    />
  )
}
