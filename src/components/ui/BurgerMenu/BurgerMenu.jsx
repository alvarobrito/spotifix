import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './BurgerMenu.css';

const BurgerMenu = ({ open, children, right, onClose }) => (
  <div className={classnames('burger-menu', { 'is-right': right, 'is-open': open })}>
    <div
      className="burger-menu__overlay"
      onClick={onClose}
    />
    <div
      className="burger-menu__wrap"
      onClick={e => e.target.tagName.toLowerCase() === 'a' && onClose()}
    >
      {children}
    </div>
  </div>
);

BurgerMenu.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  onClose: PropTypes.func,
};

BurgerMenu.defaultProps = {
  right: false,
  open: false,
  onClose: undefined,
};

export default BurgerMenu;
