import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const styles = {
  root: {
    listStyleType: 'circle',
    marginLeft: '24px',
  },
};

const Related = ({ artists }) => (
  <ol style={styles.root}>
    {artists.map(a =>
      <li key={a.id}><NavLink to={`${a.id}`}>{a.name}</NavLink></li>
    )}
  </ol>
);


Related.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object),
};

Related.defaultProps = {
  artists: [],
};

export default Related;
