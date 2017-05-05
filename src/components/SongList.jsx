import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { generate } from 'shortid';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TableRightIconMenu from './ui/TableRightIconMenu';

const artistsReducer = (prev, next) => {
  if (!prev) {
    return next.name;
  }

  return `${prev}, ${next.name}`;
};

const SongList = ({ songs }) => (
  <div>
    <Subheader>Songs</Subheader>
    <Table multiSelectable>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Artist</TableHeaderColumn>
          <TableHeaderColumn>Album</TableHeaderColumn>
          <TableRightIconMenu items={[{ title: 'Add to playlist' }]} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map(({ id, trackName, name, artists, album, albumName }) =>
          <TableRow key={id}>
            <TableRowColumn>{trackName || name}</TableRowColumn>
            <TableRowColumn>{artists.map(artist => (
              <div key={generate()}><NavLink to={`/artist/${artist.id}`}>{artist.name}</NavLink></div>
            ))}</TableRowColumn>
            <TableRowColumn>{albumName || album.name}</TableRowColumn>
            <TableRightIconMenu items={[{ title: 'Add to playlist', onClickHandler: () => (console.log('yeah')) }]} />
          </TableRow>)
        }
      </TableBody>
    </Table>
  </div>
);

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object),
};

SongList.defaultProps = {
  songs: [],
};

export default SongList;
