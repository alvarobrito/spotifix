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
            <img src="https://i.scdn.co/image/143b0f286f76ece3a711f673d9ba00b8f499b2c0" alt={artist.name} />
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
};

// Redux connector
const mapStateToProps = ({ artist }, { match }) => ({
  albums: artist.albums,
  artist: artist.data,
  artistId: match.params.artistId,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
