import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Card.css';

const Card = ({ title, subtitle, className }) => (
  <div className={classnames('card', { [`card--${className}`]: !!className })}>
    <strong className="card__title">{title}</strong>
    <span className="card__subtitle">{subtitle}</span>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
};

export default Card;
