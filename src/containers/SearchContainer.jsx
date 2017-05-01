import React from 'react';
import SongList from '@/components/SongList';
import Search from '@/components/Search';

const songList = [
  {
    name: 'Yeah',
    artist: 'Sting',
    album: 'First',
  },
  {
    name: 'Yes',
    artist: 'Interpol',
    album: 'Antics',
  },
];

const SearchContainer = () => (
  <div className="search-wrapper">
    <Search />
    <SongList songs={songList} />
  </div>
);

export default SearchContainer;
