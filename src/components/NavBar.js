import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: '#A7C957',
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
          activeStyle={{background: '#6A994E'}}>
        Trails</NavLink>
        <NavLink
          to="/users"
        //   set it up so it goes to user show page
          exact
          style={link}
          activeStyle={{background: '#6A994E'}}>
        Profile Page</NavLink>
        <NavLink
          to="/login"
          exact
          style={link}
          activeStyle={{background: '#6A994E'}}>
        Login</NavLink>
        <NavLink
          to="/"
          exact
          style={link}
          activeStyle={{background: '#6A994E'}}>
        Welcome!</NavLink>
      </div>
    );
  }
};

export default NavBar;
