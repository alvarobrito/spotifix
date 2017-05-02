import React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from './Nav';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = () => (
  <AppBar
    title="Spotifix"
    iconElementLeft={<Nav />}
  />
);

export default Header;
