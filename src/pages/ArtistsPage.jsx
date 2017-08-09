import React from 'react';
import ArtistsContainer from '@/containers/ArtistsContainer';

const ArtistsPage = ({ match: { params } }) => (
  <div className="content">
    <h1 className="h2">{params.genre} Artists</h1>
    <ArtistsContainer genre={params.genre} />
  </div>
);

export default ArtistsPage;
