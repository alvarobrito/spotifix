import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => (
  <label className="search">
    <input className="input-search" type="search" placeholder="Search a song..." onChange={onChange} />
  </label>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
