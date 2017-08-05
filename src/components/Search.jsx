import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => (
  <div className="container">
    <label>
      Search a song:
      <input type="text" onChange={onChange} />
    </label>
  </div>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
