import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { NavLink } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

const Albums = ({ albums, path }) => (
  <div style={styles.root}>
    <GridList cols={4}>
      {albums.map(a =>
        <NavLink key={a.id} to={`${path}/album/${a.id}`}>
          <GridTile
            key={a.id}
            title={a.name}
            subtitle={<span>by <strong>{a.artists[0].name}</strong></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={a.images[0].url} alt={a.name} />
          </GridTile>
        </NavLink>)}
    </GridList>
  </div>
);

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string.isRequired,
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
