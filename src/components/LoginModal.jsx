import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Login from '@/components/Login';

const LoginModal = (props) => {
  const { title } = props;
  return (
    <Dialog
      title={title}
      modal={false}
      open
    >
      <Login />
    </Dialog>
  );
};


LoginModal.propTypes = {
  title: PropTypes.string,
};

LoginModal.defaultProps = {
  title: '',
};

export default LoginModal;
