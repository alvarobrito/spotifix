import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

const Albums = ({ albums }) => (
  <div style={styles.root}>
    {albums.map(a =>
      <NavLink key={a.id} to={`../album/${a.id}`}>
        <img src={a.images[0].url} alt={a.name} />
      </NavLink>)}
  </div>
);

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
