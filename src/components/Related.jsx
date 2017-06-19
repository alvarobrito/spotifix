import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';

const Related = ({ artists }) => (
  <List>
    {artists.map(a =>
      <NavLink key={a.id} to={`${a.id}`}>
        <ListItem
          key={a.id}
          primaryText={a.name}
          leftAvatar={<Avatar src={a.images[0].url} />}
        />
      </NavLink>)}
  </List>
);


Related.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object),
};

Related.defaultProps = {
  artists: [],
};

export default Related;
