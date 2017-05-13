import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Albums from '@/components/Albums';
import { fetchArtistAlbums } from '@/modules/albums/actions';
import { selectArtistAlbums } from '@/modules/albums/selectors';

// TODO withArtist and container connector with dispatchToProps fetchArtistAlbums
class ArtistAlbums extends Component {

  componentWillMount() {
    const { artistId } = this.props;
    this.props.fetchArtistAlbums(artistId);
  }

  render() {
    const { albums, artistId } = this.props;
    return (
      <Albums albums={albums} path={artistId} />
    );
  }

}

ArtistAlbums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  artistId: PropTypes.string.isRequired,
  fetchArtistAlbums: PropTypes.func.isRequired,
};

ArtistAlbums.defaultProps = {
  albums: [],
};

const mapStateToProps = (state, { artistId }) => ({
  albums: selectArtistAlbums(artistId)(state),
});

const mapDispatchToProps = {
  fetchArtistAlbums,
};

// make & dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(ArtistAlbums);
