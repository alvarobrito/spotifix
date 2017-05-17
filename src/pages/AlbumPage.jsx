import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { selectAlbum } from '@/modules/selectors/albums';
import { fetchAlbum } from '@/modules/sections/album';
import Spinner from '@/components/ui/Spinner';
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
    const { album, loading } = this.props;
    console.log('album', album);
    return (
      <div>
        {(!loading) && (
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
        )}
        {(loading) && (<Spinner />)}
      </div>
    );
  }

}

// PropTypes validation
AlbumPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  album: PropTypes.object.isRequired,
  albumId: PropTypes.string.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
};

AlbumPage.defaultProps = {
  album: {
    id: '',
    name: '',
    label: '',
    images: [{
      width: 'auto',
      height: 'auto',
      url: '',
    }],
  },
};

// Redux connector
const mapStateToProps = (state, { match: { params: { albumId } } }) => ({
  album: selectAlbum(state),
  loading: state.sections.album.loading,
  albumId,
});

const mapDispatchToProps = {
  fetchAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
