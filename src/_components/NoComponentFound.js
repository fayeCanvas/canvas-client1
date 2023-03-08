import React from 'react';
import { ParentComponentWithNavBar } from "./genericComponent/ParentComponentWithSideBar";

class NoComponentFound extends React.Component {

  render() {
    return (
      <ParentComponentWithNavBar>
      <div>
        <h1 style={{marginLeft: '10vw'}}>Sorry. Looks like that page doesn't exist.</h1>
      </div>
      </ParentComponentWithNavBar>
    )
  }
}



export default NoComponentFound;
