import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Related = ({ artists }) => (
  <div>
    {artists.map(a =>
      <NavLink key={a.id} to={`${a.id}`}>{a.name}</NavLink>)}
  </div>
);


Related.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object),
};

Related.defaultProps = {
  artists: [],
};

export default Related;
