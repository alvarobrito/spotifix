import { connect } from 'react-redux';
import { getAlbums } from '@/modules/artist/actions';
import Albums from '@/components/Albums';

const mapStateToProps = ({ artist }) => ({
  albums: artist.albums,
});

const mapDispatchToProps = {
  getAlbums,
};

// make & dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(Albums);
