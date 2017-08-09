import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import './CardList.css';

const CardList = ({ className, items }) => (
  <ul className={classnames('card-list', { [`card-list--${className}`]: !!className })}>
    {items.map(obj => (
      <li key={obj.id} className="card-list__item">
        <NavLink to={`/artists/${obj.id}`} className="card-list__link">
          <Card title={obj.name} subtitle={`${obj.followers} Followers`} image={obj.images[1] && obj.images[1].url} />
        </NavLink>
      </li>))}
  </ul>
);

CardList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CardList.defaultProps = {
  className: '',
  items: [],
};

export default CardList;
