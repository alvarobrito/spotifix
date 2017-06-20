import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Box.css';

const Box = ({ text, className }) => (
  <strong className={classnames('box', { [`box--${className}`]: !!className })}>{text}</strong>
);

Box.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Box.defaultProps = {
  className: '',
  text: '',
};

export default Box;
