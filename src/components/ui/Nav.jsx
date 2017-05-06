import React from 'react';
import { NavLink } from 'react-router-dom';
import { generate } from 'shortid';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

const Nav = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color="white" /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <div>
      {links.map(l =>
        <MenuItem
          key={generate()}
          primaryText={l.text}
          containerElement={<NavLink to={l.path} />}
        />)}
    </div>
  </IconMenu>
);

export default Nav;
