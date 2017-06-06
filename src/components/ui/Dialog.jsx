import React from 'react';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

const DialogComponent = ({ open, message }) => (
  <div>
    <Dialog
      modal={false}
      open={open}
    >
      {message}
      <p><a href="/login">login</a></p>
    </Dialog>
  </div>
);

DialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default DialogComponent;
