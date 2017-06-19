import React from 'react';
import { connect } from 'react-redux';

const ModalSwitcher = (props) => {
  if (!props.active) {
    return null;
  }
  const ModalContent = props.children.find(e => e.key === props.active);
  return (React.cloneElement(ModalContent, { ...props.props }));
};

const mapStateToProps = ({ ui: { modal } }) => ({
  active: modal.active,
  props: modal.props,
});

export default connect(mapStateToProps, null)(ModalSwitcher);
