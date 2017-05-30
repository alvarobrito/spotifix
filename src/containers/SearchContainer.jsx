import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import withFetchOnScroll from '@/components/hoc/withFetchOnScroll';
import SongList from '@/components/SongList';
import Search from '@/components/Search';
import { fetchSongs, fetchMoreSongs } from '@/modules/sections/search';
import { getSearchTracks } from '@/modules/selectors/search';

const SearchContainer = ({ onSearchChange, loading, tracks }) => (
  <div className="search-wrapper">
    <Search onChange={(event, searchInputNow) => onSearchChange(searchInputNow)} />
    <SongList songs={tracks} />
    <div>
      {(loading) && (
        <LinearProgress />
      )}
    </div>
  </div>
);

SearchContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { sections: { search: { searchInput, loading } } } = state;
  return {
    searchInput,
    loading,
    tracks: getSearchTracks(state),
  };
}

const mapDispatchToProps = {
  onSearchChange: fetchSongs,
  scrollFunction: fetchMoreSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(withFetchOnScroll(SearchContainer));
