import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'react-hamburgers';
import BurgerMenu from '@/components/ui/BurgerMenu/BurgerMenu';
import './Header.css';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const items = [
  'Pop',
  'Rock',
  'R&B',
  'Classic',
  'Hip Hop',
  'Reggeaton',
  'Electro',
  'Dance',
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <BurgerMenu open={this.state.isOpen} onClickOverlay={this.toggleMenu}>
          <Hamburger
            active
            type="boring hamburger--m"
            onClick={this.toggleMenu}
          />
          <nav className="nav">
            <ul className="nav__content">
              {items.map(e => (
                <li className="nav__item" key={e}>
                  <NavLink to="" className="nav__link">{e}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </BurgerMenu>
        <header className="header">
          <Hamburger
            active={false}
            type="arrowturn"
            onClick={this.toggleMenu}
            style={{ position: 'absolute', top: '20px', left: '10px' }}
          />
          <h1 className="header__title">Spotifix</h1>
        </header>
      </div>
    );
  }
}

export default Header;
