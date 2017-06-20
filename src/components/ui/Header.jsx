import React from 'react';
import Nav from './Nav';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = () => (
  <div className="header">
    <h1 className="h2">Spotifix</h1>
    <Nav />
  </div>
);

export default Header;
