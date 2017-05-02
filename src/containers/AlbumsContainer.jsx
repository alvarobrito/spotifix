import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Albums from '@/components/Albums';
import { getAlbums } from '@/modules/artist/actions';

class AlbumsContainer extends Component {

  componentWillMount() {
    this.props.getAlbums();
  }

  render() {
    return (
      <Albums albums={this.props.albums} />
    );
  }

}

AlbumsContainer.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  getAlbums: PropTypes.func.isRequired,
};

AlbumsContainer.defaultProps = {
  albums: [],
};

const mapStateToProps = ({ artist }) => ({
  albums: artist.albums,
});

const mapDispatchToProps = {
  getAlbums,
};

// make & dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);
