import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@/components/ui/Dialog';
import PropTypes from 'prop-types';

const DialogContainer = ({ open, message }) => (
  <div>
    <Dialog
      modal={false}
      open={open}
      message={message}
    >
    </Dialog>
  </div>
);

DialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

// Redux connector
const mapStateToProps = ({ ui: { dialog } }) => ({
  open: dialog.show,
  message: dialog.message,
});


export default connect(mapStateToProps, null)(Dialog);
