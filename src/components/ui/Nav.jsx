import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Browse',
    path: '/browse',
  },
  {
    text: 'Login',
    path: '/login',
  },
];

const Nav = () => (
  <div>
    {links.map(l => <NavLink key={l.text} to={l.path}>{l.text}</NavLink>)}
  </div>
);

export default Nav;
