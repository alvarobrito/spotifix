import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SongList from '@/components/SongList';
import Search from '@/components/Search';
import { fetchSongs } from '@/modules/search/actions';

const SearchContainer = ({ onSearchChange, songs }) => (
  <div className="search-wrapper">
    <Search onChange={onSearchChange} />
    <SongList songs={songs} />
  </div>
);

SearchContainer.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { search: { songs } } = state;

  return {
    songs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchChange: (event, searchInput) => {
      dispatch(fetchSongs(searchInput));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
