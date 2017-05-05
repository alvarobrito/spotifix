import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SongList from '@/components/SongList';
import Search from '@/components/Search';
import { fetchSongs, fetchMoreSongs } from '@/modules/search/actions';

const SearchContainer = ({ onSearchChange, addMoreSongs, songs, searchInput, loading }) => (
  <div className="search-wrapper">
    <Search onChange={(event, searchInputNow) => onSearchChange(searchInputNow)} />
    <SongList songs={songs} />
    <div>
      {(songs.length > 0) && (
        <RaisedButton
          label="More"
          onClick={() => addMoreSongs(searchInput)}
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

const mapDispatchToProps = {
  onSearchChange: fetchSongs,
  addMoreSongs: fetchMoreSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
