import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// Modules
import { getArtist } from '@/modules/sections/artist';
import { selectArtistAlbums } from '@/modules/selectors/albums';
import { selectArtist, selectRelatedArtists } from '@/modules/selectors/artists';

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
    const { loading, albums, artist, relatedArtists } = this.props;
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
              <h3>Albums</h3>
              <Albums albums={albums} />
              {/* <h3>Top tracks</h3>
              <SongList songs={artist.topTracks} />*/}
              <h3>Related artists</h3>
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
};

// Redux connector
const mapStateToProps = (state, { match: { params: { artistId } } }) => ({
  albums: selectArtistAlbums(state),
  relatedArtists: selectRelatedArtists(state),
  artist: selectArtist(state),
  loading: state.sections.artist.loading,
  artistId,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
