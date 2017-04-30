import React from 'react';
import Nav from '@/components/ui/Nav';

const links = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Browse',
    path: '/browse',
  },
  {
    text: 'Login',
    path: '/login',
  },
];

const SideBarContainer = () => (
  <aside className="sidebar">
    <Nav links={links} />
  </aside>
);

export default SideBarContainer;
