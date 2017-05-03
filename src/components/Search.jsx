import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const Search = ({ onChange }) => (
  <Toolbar>
    <ToolbarGroup>
      <TextField
        hintText="Search anything..."
        onChange={onChange}
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <RaisedButton
        label="Filters"
      />
      <RaisedButton
        label="Add to playlist"
      />
    </ToolbarGroup>
  </Toolbar>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
