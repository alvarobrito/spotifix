import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

class Albums extends Component {

  componentWillMount() {
    this.props.getAlbums();
  }

  render() {
    return (
      <List>
        {this.props.albums.map(a =>
          <ListItem key={a.id} primaryText={a.name} />
        )}
      </List>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  getAlbums: PropTypes.func.isRequired,
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
