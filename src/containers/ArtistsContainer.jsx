import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardList from '@/components/ui/Cards/CardList';
import withFetchOnScroll from '@/components/hoc/withFetchOnScroll';
import { fetchAllArtists, fetchMoreArtists } from '@/modules/sections/artists';
import { getArtistsList } from '@/modules/sections/artists/selectors';

class ArtistsContainer extends Component {

  componentDidMount() {
    this.props.fetchAllArtists();
  }

  render() {
    const { loading, artists } = this.props;
    return (
      <div>
        {(!!artists.length) && (
          <CardList items={artists} />
        )}
        {/*{(loading) && (<Spinner />)}*/}
      </div>
    );
  }

}

// PropTypes validation
ArtistsContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllArtists: PropTypes.func.isRequired,
};

ArtistsContainer.defaultProps = {
  artists: [],
};

// Redux connector
const mapStateToProps = state => ({
  artists: getArtistsList(state),
  from: state.sections.artists.from,
  loading: state.sections.artists.loading,
});

const mapDispatchToProps = {
  fetchAllArtists,
  scrollFunction: fetchMoreArtists,
};

export default connect(mapStateToProps, mapDispatchToProps)(withFetchOnScroll(ArtistsContainer));
