import React from 'react';
import BoxList from '@/components/ui/Box/BoxList';

const sections = [{
  id: 0,
  name: 'Genres',
  path: '/',
}, {
  id: 1,
  name: 'Songs',
  path: '/songs',
}, {
  id: 2,
  name: 'Albums',
  path: '/',
}, {
  id: 3,
  name: 'Artists',
  path: '/',
}];

const HomePage = () => (
  <div className="home-page">
    <BoxList items={sections} />
  </div>
);

export default HomePage;
