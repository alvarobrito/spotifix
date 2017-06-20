import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Box from './Box';
import './BoxList.css';

const BoxList = ({ className, items }) => (
  <ul className={classnames('box-list', { [`box-list--${className}`]: !!className })}>
    {items.map(i => (
      <li key={i.id} className="box-list__item">
        <NavLink to={i.path}>
          <Box text={i.name} />
        </NavLink>
      </li>))}
  </ul>
);

BoxList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BoxList.defaultProps = {
  className: '',
  items: [],
};

export default BoxList;
