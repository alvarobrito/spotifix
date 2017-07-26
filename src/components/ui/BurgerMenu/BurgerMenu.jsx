import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './BurgerMenu.css';

const BurgerMenu = ({ open, children, right, onClickOverlay }) => (
  <div className={classnames('burger-menu', { 'is-right': right, 'is-open': open })}>
    {(onClickOverlay) && (
      <div
        className="burger-menu__overlay"
        onClick={onClickOverlay}
      />
    )}
    <div className="burger-menu__wrap">
      {children}
    </div>
  </div>
);

BurgerMenu.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  right: PropTypes.bool,
  onClickOverlay: PropTypes.func,
};

BurgerMenu.defaultProps = {
  right: false,
  open: false,
  onClickOverlay: undefined,
};

export default BurgerMenu;
