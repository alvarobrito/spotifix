import React from 'react';
import ArtistsList from '@/containers/ArtistsList';

const ArtistsPage = ({ match: { params } }) => (
  <div className="content">
    <h1 className="h2">{params.genre} Artists</h1>
    <ArtistsList genre={params.genre} />
  </div>
);

export default ArtistsPage;
