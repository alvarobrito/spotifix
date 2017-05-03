import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtist } from '@/modules/artist/actions';
import Albums from '@/components/Albums';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

class ArtistPage extends Component {

  componentWillMount() {
    this.props.getArtist(this.props.artistId);
  }

  render() {
    const { artist, albums } = this.props;
    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={artist.name} />}
          >
            <img src={artist.images[0].url} alt={artist.name} />
          </CardMedia>
          <CardText>
            <Albums albums={albums} />
          </CardText>
        </Card>
      </div>
    );
  }

}

// PropTypes validation
ArtistPage.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  artist: PropTypes.object,
  artistId: PropTypes.string.isRequired,
  getArtist: PropTypes.func.isRequired,
};

ArtistPage.defaultProps = {
  albums: [],
  artist: {},
  loading: false,
};

// Redux connector
const mapStateToProps = ({ artist }, { match }) => ({
  albums: artist.albums,
  artist: artist.data,
  loading: artist.loading,
  artistId: match.params.artistId,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
