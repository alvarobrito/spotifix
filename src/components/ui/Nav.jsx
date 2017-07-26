import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchGenres } from '@/modules/sections/genres';

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

class Nav extends Component {

  componentDidMount() {
    this.props.fetchGenres();
  }

  render() {
    return (
      <nav className="nav">
        <ul className="nav__content">
          {links.map(e => (
            <li className="nav__item" key={e.text}>
              <NavLink to={e.path} className="h2 --nosep">{e.text}</NavLink>
            </li>
          ))}
        </ul>
        <h1 className="h2">Genres</h1>
        <ul className="nav__content">
          {this.props.items.map(e => (
            <li className="nav__item" key={e}>
              <NavLink to="" className="nav__link">{e}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchGenres: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.sections.genres.list,
});

const mapDispatchToProps = {
  fetchGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
