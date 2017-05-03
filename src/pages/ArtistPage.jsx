import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { getArtist } from '@/modules/artist/actions';
import Albums from '@/components/Albums';
import SongList from '@/components/SongList';

class ArtistPage extends Component {

  componentWillMount() {
    this.props.getArtist(this.props.artistId);
  }

  render() {
    const { artist } = this.props;
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={artist.name} />}
          >
            <img src={artist.images[0].url} alt={artist.name} />
          </CardMedia>
          <CardText>
            <Albums albums={artist.albums} />
            <SongList songs={artist.topTracks} />
          </CardText>
        </Card>
      </div>
    );
  }

}

// PropTypes validation
ArtistPage.propTypes = {
  artist: PropTypes.object,
  artistId: PropTypes.string.isRequired,
  getArtist: PropTypes.func.isRequired,
};


// Redux connector
const mapStateToProps = ({ artist }, { match }) => ({
  artist: artist.data,
  loading: artist.loading,
  artistId: match.params.artistId,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
