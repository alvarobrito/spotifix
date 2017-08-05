import React, { Component } from 'react';
import Hamburger from 'react-hamburgers';
import BurgerMenu from '@/components/ui/BurgerMenu/BurgerMenu';
import Nav from '@/components/ui/Nav';
import './Header.css';

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
        <BurgerMenu open={this.state.isOpen} onClose={this.toggleMenu}>
          <Hamburger
            active
            type="boring hamburger--m"
            onClick={this.toggleMenu}
          />
          <Nav />
        </BurgerMenu>
        <header className="header">
          <Hamburger
            active={false}
            type="arrowturn"
            onClick={this.toggleMenu}
          />
          <h1 className="header__title">Spotifix</h1>
        </header>
      </div>
    );
  }
}

export default Header;
