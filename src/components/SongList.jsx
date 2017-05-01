import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
      {songs.map(({ name, artist, album }) =>
        <TableRow key={name}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{artist}</TableRowColumn>
          <TableRowColumn>{album}</TableRowColumn>
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
