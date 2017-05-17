import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SongList from '@/components/SongList';
import Search from '@/components/Search';
import { fetchSongs, fetchMoreSongs } from '@/modules/search/actions';
import { getSearchTracks } from '@/modules/search/selectors';

const SearchContainer = ({ onSearchChange, addMoreSongs, searchInput, loading, tracks }) => (
  <div className="search-wrapper">
    <Search onChange={(event, searchInputNow) => onSearchChange(searchInputNow)} />
    <SongList songs={tracks} />
    <div>
      {(tracks.length > 0) && (
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
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  addMoreSongs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { search: { searchInput, loading } } = state;

  return {
    searchInput,
    loading,
    tracks: getSearchTracks(state),
  };
}

const mapDispatchToProps = {
  onSearchChange: fetchSongs,
  addMoreSongs: fetchMoreSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
