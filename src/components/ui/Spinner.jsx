import React from 'react';

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 11001,
  },
  refresh: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
    transform: 'none',
    opacity: 0.9,
  },
};

const Spinner = () => (
  <div style={style.container}>
    <div style={style.refresh}>loading...</div>
  </div>
);

export default Spinner;
