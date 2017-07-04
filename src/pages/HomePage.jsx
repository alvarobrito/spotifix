import React from 'react';
import CardList from '@/containers/GenresContainer';

const sections = [{
  id: 0,
  name: 'Pop',
  path: '/',
}, {
  id: 1,
  name: 'Electronic',
  path: '/songs',
}, {
  id: 2,
  name: 'Rock',
  path: '/',
}, {
  id: 3,
  name: 'Dance',
  path: '/',
}];

const HomePage = () => (
  <div className="home-page">
    <h1 className="h2">Artists</h1>
    <CardList items={sections} />
  </div>
);

export default HomePage;
