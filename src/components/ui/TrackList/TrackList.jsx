import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import './TrackList.css';

const TrackList = ({ className, tracks }) => {
  if (!tracks) return null;
  return (
    <ol className={classnames('track-list', { [`track-list--${className}`]: !!className })}>
      {tracks.map(({ id, name, album, artists }) =>
        <li key={id} className="track-list__item">
          <strong className="track-list__title">{name}</strong>
          {(artists) && (<NavLink to={`/artist/${artists[0].id}`}><span className="track-list__subtitle">{artists[0].name}</span></NavLink>)}
          <NavLink to={`/album/${album.id}`}>
            <span className="track-list__subtitle">{album.name}</span>
          </NavLink>
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
