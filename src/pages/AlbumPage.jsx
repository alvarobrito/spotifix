import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlbum } from '@/modules/sections/album';
import { getSelectedAlbum, getAlbumTracks } from '@/modules/sections/album/selectors';
import Spinner from '@/components/ui/Spinner';
import TrackList from '@/components/ui/TrackList/TrackList';

class AlbumPage extends Component {

  componentWillMount() {
    this.props.fetchAlbum(this.props.albumId);
  }

  componentDidUpdate({ albumId }) {
    if (this.props.albumId !== albumId) {
      this.props.fetchAlbum(albumId);
    }
  }

  render() {
    const { album, tracks, loading } = this.props;

    return (
      <div className="content">
        {(!loading) && (
          <article className="content__inner">
            <header className="overlay-image" style={{ backgroundImage: `url(${album.images[0].url})` }}>
              <h1 className="overlay-image__title">{album.name}</h1>
            </header>
            <div className="group">
              <TrackList tracks={tracks} />
            </div>
          </article>
        )}
        {(loading) && (<Spinner />)}
      </div>
    );
  }

}

// PropTypes validation
AlbumPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    images: PropTypes.array,
  }).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  tracks: [],
  albumId: '',
};

// Redux connector
const mapStateToProps = (state, { match: { params: { albumId } } }) => ({
  album: getSelectedAlbum(state),
  tracks: getAlbumTracks(state),
  loading: state.sections.album.loading,
  albumId,
});

const mapDispatchToProps = {
  fetchAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
