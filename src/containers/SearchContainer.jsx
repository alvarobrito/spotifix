import React from 'react';
import List from '@/components/List';
import Search from '@/components/Search';

const SearchContainer = () => (
  <div className="search-wrapper">
    <Search />
    <List />
  </div>
);

export default SearchContainer;
