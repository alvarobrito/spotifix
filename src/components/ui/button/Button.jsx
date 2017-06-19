import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ onClick, primary, children }) =>
  <button
    onClick={onClick}
    className={classnames('btn', { 'btn--primary': !!primary })}
    type="button"
  >
    {children}
  </button>;

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  primary: '',
};

export default Button;
