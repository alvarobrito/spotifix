import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ primary, children, ...props }) =>
  <button
    className={classnames('btn', { 'btn--primary': !!primary })}
    type="button"
    {...props}
  >
    {children}
  </button>;

Button.propTypes = {
  primary: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  primary: '',
};

export default Button;
