import React from 'react';
import ArtistsList from '@/containers/ArtistsList';

const HomePage = (props) => {

  return (
    <div className="content">
      <h1 className="h2">Artists</h1>
      <ArtistsList genre="pop" />
    </div>
  );

};

export default HomePage;
