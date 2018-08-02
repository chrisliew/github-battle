import React from 'react';
import { BrowserRouter as Link, NavLink } from "react-router-dom";


export class Navbar extends React.Component {
  render() {
    return (
        <ul className="navbar">
          <li>
            <NavLink exact activeClassName='active' to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/battle'>Battle</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
          </li>
        </ul>
    )
  }
}