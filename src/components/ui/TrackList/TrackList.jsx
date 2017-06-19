import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TrackList.css';

const TrackList = ({ className, tracks }) => {
  if (!tracks) {
    return null;
  }
  return (
    <ol className={classnames('track-list', { [`track-list--${className}`]: !!className })}>
      {tracks.map(({ id, name, album: { name: albumName } }) =>
        <li key={id} className="track-list__item">
          <strong className="track-list__title">{name}</strong>
          <span className="track-list__subtitle">{albumName}</span>
        </li>)}
    </ol>
  );
};

TrackList.propTypes = {
  className: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TrackList.defaultProps = {
  className: '',
};

export default TrackList;
