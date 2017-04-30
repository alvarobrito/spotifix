import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = props => (
  <ul className="nav">
    {props.links.map(l =>
      <li className="nav__item" key={l.text.trim()}>
        <NavLink activeClassName="nav__link--active" to={l.path}>{l.text}</NavLink>
      </li>)}
  </ul>
);

Nav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
};

Nav.defaultProps = {
  links: [],
};

export default Nav;
