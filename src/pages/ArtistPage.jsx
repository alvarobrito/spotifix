import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Modules
import { fetchArtist } from '@/modules/sections/artist';
import { getSelectedArtist, getRelatedArtists, getArtistAlbums, getArtistTopTracks } from '@/modules/sections/artist/selectors';

// Components
import Albums from '@/components/Albums';
import Related from '@/components/Related';
import TrackList from '@/components/ui/TrackList/TrackList';
import Spinner from '@/components/ui/Spinner';

class ArtistPage extends Component {

  componentDidMount() {
    this.props.fetchArtist(this.props.artistId);
  }

  componentDidUpdate({ artistId }) {
    if (this.props.artistId !== artistId) {
      this.props.fetchArtist(artistId);
    }
  }

  render() {
    const { loading, albums, artist, relatedArtists, topTracks } = this.props;

    return (
      <div className="content">
        {(!loading) && (
          <div>
            <h1 className="h2">{artist.name}</h1>
            <img src={artist.images[0].url} alt="" />
            <div className="group">
              <h3 className="h2">Popular</h3>
              <TrackList tracks={topTracks} />
            </div>
            <div className="group">
              <h3 className="h2">Albums</h3>
              <Albums albums={albums} />
            </div>
            <div className="group">
              <h3 className="h2">Related artists</h3>
              <Related artists={relatedArtists} />
            </div>
          </div>
        )}
        {(loading) && (<Spinner />)}
      </div>
    );
  }

}

// PropTypes validation
ArtistPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.array,
  }).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  relatedArtists: PropTypes.arrayOf(PropTypes.object).isRequired,
  topTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistId: PropTypes.string.isRequired,
  fetchArtist: PropTypes.func.isRequired,
};

ArtistPage.defaultProps = {
  artist: {
    id: '',
    name: '',
    images: [{
      width: 'auto',
      height: 'auto',
      url: '',
    }],
  },
  albums: [],
  relatedArtists: [],
  topTracks: [],
};

// Redux connector
const mapStateToProps = (state, { match: { params: { artistId } } }) => ({
  artist: getSelectedArtist(state),
  albums: getArtistAlbums(state),
  topTracks: getArtistTopTracks(state),
  relatedArtists: getRelatedArtists(state),
  loading: state.sections.artist.loading,
  artistId,
});

const mapDispatchToProps = {
  fetchArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
