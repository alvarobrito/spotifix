import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SongList from '@/components/SongList';
import Search from '@/components/Search';
import { fetchSongs } from '@/modules/search/actions';

const SearchContainer = ({ onSearchChange, addMoreSongs, songs, searchInput, loading }) => (
  <div className="search-wrapper">
    <Search onChange={onSearchChange} />
    <SongList songs={songs} />
    <div>
      {(songs.length > 0) && (
        <RaisedButton
          label="More"
          onClick={addMoreSongs(searchInput)}
        />
      )}
      {(loading) && (
        <LinearProgress />
      )}
    </div>
  </div>
);

SearchContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchInput: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  addMoreSongs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { search: { searchInput, songs, loading } } = state;

  return {
    searchInput,
    songs,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchChange: (event, searchInput) => {
      dispatch(fetchSongs(searchInput));
    },
    addMoreSongs: searchInput => () => {
      dispatch(fetchSongs(searchInput));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
