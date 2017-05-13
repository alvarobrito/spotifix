import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import { fetchArtist } from '@/modules/artists/actions';
import { selectArtist } from '@/modules/albums/selectors';

// Custom
import ArtistAlbums from '@/containers/ArtistAlbums';
// import SongList from '@/components/SongList';
// import Related from '@/components/Related';
import Spinner from '@/components/ui/Spinner';

class ArtistPage extends Component {

  componentWillMount() {
    this.props.fetchArtist(this.props.artistId);
  }

  componentWillReceiveProps({ artistId }) {
    if (this.props.artistId !== artistId) {
      this.props.fetchArtist(artistId);
    }
  }

  render() {
    const { loading, artist, artistId } = this.props;
    return (
      <div>
        {(!loading && artist) && (
          <Card>
            <CardMedia
              overlay={<CardTitle title={artist.name} />}
            >
              <img src={artist.images[0].url} alt={artist.name} />
            </CardMedia>
            <CardText>
              <Subheader>Albums</Subheader>
              <ArtistAlbums artistId={artistId} />
              {/* <Subheader>Top tracks</Subheader>
              <SongList songs={artist.topTracks} />
              <Subheader>Related artists</Subheader>
              <Related artists={artist.related} /> */}
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
  artist: PropTypes.object,
  artistId: PropTypes.string.isRequired,
  fetchArtist: PropTypes.func.isRequired,
};

// Redux connector
const mapStateToProps = (state, { match: { params: { artistId } } }) => ({
  artist: selectArtist(artistId)(state),
  loading: state.artists.loading,
  artistId,
});

const mapDispatchToProps = {
  fetchArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
