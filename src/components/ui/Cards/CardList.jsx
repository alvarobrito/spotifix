import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import './CardList.css';

const CardList = ({ className, items }) => (
  <ul className={classnames('card-list', { [`card-list--${className}`]: !!className })}>
    {items.map((val, i) => (
      <li key={i} className="card-list__item">
        <NavLink to="/" className="card-list__link">
          <Card title={val} subtitle="800,92 Followers" />
        </NavLink>
      </li>))}
  </ul>
);

CardList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CardList.defaultProps = {
  className: '',
  items: [],
};

export default CardList;
