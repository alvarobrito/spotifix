import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '@/components/ui/Spinner';
import withFetchOnScroll from '@/components/hoc/withFetchOnScroll';
import TrackList from '@/components/ui/TrackList/TrackList';
import Search from '@/components/Search';
import { fetchSongs, fetchMoreSongs } from '@/modules/sections/search';
import { getSearchTracks } from '@/modules/sections/search/selectors';

const SearchContainer = ({ onSearchChange, loading, tracks }) => (
  <div className="search-wrapper content">
    <Search onChange={(event) => onSearchChange(event.target.value)} />
    <TrackList tracks={tracks} />
    {(loading) && (<p style={{ textAlign: 'center', clear: 'both', margin: '12px 0', fontSize: '62px', fontWeight: 'bold', letterSpacing: '6px' }}>...</p>)}
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
