import { connect } from 'react-redux';
import Login from '@/components/Login';
import * as actions from '@/modules/auth/actions';

const mapStateToProps = state => ({
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  ...actions,
};

// make & dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(Login);
