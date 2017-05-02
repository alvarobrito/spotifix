import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

const Albums = ({ albums }) => (
  <div style={styles.root}>
    <GridList cols="4">
      <Subheader>Albums</Subheader>
      {albums.map(a =>
        <GridTile
          key={a.id}
          title={a.name}
          subtitle={<span>by <strong>{a.artists[0].name}</strong></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={a.images[0].url} alt={a.name} />
        </GridTile>)}
    </GridList>
  </div>
);

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
