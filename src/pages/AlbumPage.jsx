import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import { getAlbum } from '@/modules/album/actions';
import SongList from '@/components/SongList';

class AlbumPage extends Component {

  componentWillMount() {
    this.props.getAlbum(this.props.albumId);
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
            <Subheader>Tracks</Subheader>
            <SongList songs={album.tracks} />
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
  getAlbum: PropTypes.func.isRequired,
};


// Redux connector
const mapStateToProps = ({ album }, { match }) => ({
  album: album.data,
  loading: album.loading,
  albumId: match.params.albumId,
});

const mapDispatchToProps = {
  getAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
