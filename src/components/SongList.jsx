import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const artistsReducer = (prev, next) => {
  if (!prev) {
    return next.name;
  }

  return `${prev}, ${next.name}`;
};

const SongList = ({ songs }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Artist</TableHeaderColumn>
        <TableHeaderColumn>Album</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {songs.map(({ id, trackName, name, artists, album, albumName }) =>
        <TableRow key={id}>
          <TableRowColumn>{trackName || name}</TableRowColumn>
          <TableRowColumn>{artists.reduce(artistsReducer, '')}</TableRowColumn>
          <TableRowColumn>{albumName || album.name}</TableRowColumn>
        </TableRow>)
      }
    </TableBody>
  </Table>
);

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object),
};

SongList.defaultProps = {
  songs: [],
};

export default SongList;
