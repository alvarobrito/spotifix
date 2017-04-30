import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const Search = () => (
  <Toolbar>
    <ToolbarGroup>
      <TextField
        hintText="Search anything..."
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <Toggle
        label="Active filters"
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <RaisedButton
        label="Filters"
      />
    </ToolbarGroup>
  </Toolbar>
);

export default Search;
