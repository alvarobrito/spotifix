import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  list: {
    width: '25%',
  },
  link: {
    display: 'block',
    margin: '8%',
  },
  image: {
    borderRadius: '50%',
    border: 'solid 1px white',
    display: 'block',
  },
};

const Albums = ({ albums }) => (
  <ul style={styles.root}>
    {albums.map(a =>
      <li style={styles.list} key={a.id}>
        <NavLink to={`../album/${a.id}`} style={styles.link}>
          <img src={a.images[0].url} alt={a.name} style={styles.image} />
        </NavLink>
      </li>)}
  </ul>
);

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
