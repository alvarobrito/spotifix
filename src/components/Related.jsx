import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  grid: {
    borderRadius: '100%',
  },
};

const Related = ({ artists }) => (
  <div style={styles.root}>
    <GridList cols={6}>
      {artists.map(a =>
        <NavLink key={a.id} to={`${a.id}`}>
          <GridTile
            key={a.id}
            style={styles.grid}
          >
            <img src={a.images[0].url} alt={a.name} />
          </GridTile>
        </NavLink>)}
    </GridList>
  </div>
);

Related.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object),
};

Related.defaultProps = {
  artists: [],
};

export default Related;
