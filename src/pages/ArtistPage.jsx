import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// Modules
import { getArtist } from '@/modules/sections/artist';
import { selectArtistAlbums } from '@/modules/selectors/albums';
import { selectRelatedArtists } from '@/modules/selectors/artists';

// Components
import Albums from '@/components/Albums';
import Related from '@/components/Related';
// import SongList from '@/components/SongList';
import Spinner from '@/components/ui/Spinner';

class ArtistPage extends Component {

  componentWillMount() {
    this.props.getArtist(this.props.artistId);
  }

  componentWillReceiveProps({ artistId }) {
    if (this.props.artistId !== artistId) {
      this.props.getArtist(artistId);
    }
  }

  render() {
    const { loading, albums, artist, relatedArtists, artistId } = this.props;
    return (
      <div>
        {(!loading) && (
          <Card>
            <CardMedia
              overlay={<CardTitle title={artist.name} />}
            >
              <img src={artist.images[0].url} alt={artist.name} />
            </CardMedia>
            <CardText>
              <h2>Albums</h2>
              <Albums albums={albums} />
              {/* <h2>Top tracks</h2>
              <SongList songs={artist.topTracks} />*/}
              <h2>Related artists</h2>
              <Related artists={relatedArtists} />
            </CardText>
          </Card>
        )}
        {(loading) && (<Spinner />)}
      </div>
    );
  }

}

// PropTypes validation
ArtistPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  artist: PropTypes.object.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  relatedArtists: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistId: PropTypes.string.isRequired,
  getArtist: PropTypes.func.isRequired,
};

// Redux connector
const mapStateToProps = (state, { match: { params: { artistId } } }) => ({
  albums: selectArtistAlbums(state),
  relatedArtists: selectRelatedArtists(state),
  artist: state.sections.artist,
  loading: state.sections.artist.loading,
  artistId,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
