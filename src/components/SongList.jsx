import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { generate } from 'shortid';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TableRightIconMenu from './ui/TableRightIconMenu';

const SongList = ({ songs, addSongToPlaylist, addSelectedToPlaylist }) => (
  <div>
    <Table multiSelectable>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Artist</TableHeaderColumn>
          <TableHeaderColumn>Album</TableHeaderColumn>
          <TableRightIconMenu
            items={[
              {
                title: 'Add to playlist',
                onClickHandler: addSelectedToPlaylist,
              },
            ]}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs && songs.map(({ id, name: trackName, artists, album: { name: albumName } }) =>
          <TableRow key={id}>
            <TableRowColumn>{trackName}</TableRowColumn>
            <TableRowColumn>{artists && artists.map(artist => (
              <div key={generate()}><NavLink to={`/artist/${artist.id}`}>{artist.name}</NavLink></div>
            ))}</TableRowColumn>
            <TableRowColumn>{albumName}</TableRowColumn>
            <TableRightIconMenu
              items={[
                {
                  title: 'Add to playlist',
                  onClickHandler: addSongToPlaylist,
                },
              ]}
            />
          </TableRow>)
        }
      </TableBody>
    </Table>
  </div>
);

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object),
  addSongToPlaylist: PropTypes.func,
  addSelectedToPlaylist: PropTypes.func,
};

SongList.defaultProps = {
  songs: [],
};

export default SongList;
