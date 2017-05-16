import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import { fetchAlbum } from '@/modules/sections/album';
// import SongList from '@/components/SongList';

class AlbumPage extends Component {

  componentWillMount() {
    this.props.fetchAlbum(this.props.albumId);
  }

  componentWillReceiveProps({ albumId }) {
    if (this.props.albumId !== albumId) {
      this.props.fetchAlbum(albumId);
    }
  }

  render() {
    const { album } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            title={album.name}
            subtitle={album.label}
            avatar={album.images[0].url}
          />
          <CardText>
            <h3>Tracks</h3>
            {/* <SongList songs={album.tracks} /> */}
          </CardText>
        </Card>
      </div>
    );
  }

}

// PropTypes validation
AlbumPage.propTypes = {
  album: PropTypes.object,
  albumId: PropTypes.string.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
};


// Redux connector
const mapStateToProps = ({ sections: { album } }, { match }) => ({
  album,
  loading: album.loading,
  albumId: match.params.albumId,
});

const mapDispatchToProps = {
  fetchAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
