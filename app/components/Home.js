import React from 'react';
import {Link} from "react-router-dom";

export class Home extends React.Component {
  render() {

    return (
      <div className='home-container'>
        <h1>Welcome to Github Battle!  Battle Your Friends For Ultimate Glory! </h1>
        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
    )
  }
}


