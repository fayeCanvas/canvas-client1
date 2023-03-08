import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserRole } from './helpers.js';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const RedirectRoute = ({ component: Component, ...rest }) => {
  // const user = getUserRole();
  const user = cookie.get('user')

  if (user == undefined) {
    return (
      <Redirect to={{
        pathname: "/login"
      }}
      />
    )
  }

  return (
    <Route {...rest} render={props => {
      switch (user.role) {
        case 'PATIENT':
          return <Redirect to={{
            pathname: `/patient/dashboard/`,
            state: { from: props.location }
          }}
          />;
        case 'THERAPIST':
          return <Redirect to={{
            pathname: `/therapist/dashboard/`,
            state: { from: props.location }
          }}
          />;
        case 'ADMIN':
          return <Redirect to={{
            pathname: `/admindashboard/${user._id}`,
            state: { from: props.location }
          }}
          />;
      }
    }}
    />
  )
}
