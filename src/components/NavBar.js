import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}


class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <NavLink
          to="/trails"
          exact
          style={link}
          activeStyle={{background: 'darkblue'}}>
        Trails</NavLink>
        <NavLink
          to="/users"
        //   set it up so it goes to user show page
          exact
          style={link}
          activeStyle={{background: 'darkblue'}}>
        Profile Page</NavLink>
        <NavLink
          to="/login"
          exact
          style={link}
          activeStyle={{background: 'darkblue'}}>
        Login</NavLink>
        <NavLink
          to="/"
          exact
          style={link}
          activeStyle={{background: 'darkblue'}}>
        Welcome!</NavLink>
      </div>
    );
  }
};

export default NavBar;
