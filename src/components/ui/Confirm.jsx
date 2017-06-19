import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default function Confirm(props) {
  const onAccept = () => {
    if (props.onAccept) props.onAccept();
    console.log('accept', props);
  };

  const onCancel = () => {
    if (props.onCancel) props.onCancel();
    console.log('cancel', props);
  };

  return (
    <Dialog
      title='Confirm'
      modal={false}
      open
    >
      <p>{props.text}</p>
      <RaisedButton label="Yes" primary onClick={onAccept} />
      <RaisedButton label="No" secondary onClick={onCancel} />
    </Dialog>
  );
}

Confirm.propTypes = {
  text: PropTypes.string,
  onAccept: PropTypes.func, // eslint-disable-line
  onCancel: PropTypes.func,
};
