import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// Containers
import SearchContainer from '@/containers/SearchContainer';
import Header from '@/components/ui/Header';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ArtistPage from '@/pages/ArtistPage';
import AlbumPage from '@/pages/AlbumPage';

const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Header />
      <Route exact path="/" component={SearchContainer} />
      <Route path="/browse" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/artist/:artistId" exact component={ArtistPage} />
      <Route path="/artist/:artistId/album/:albumId" component={AlbumPage} />
      <Route path="/album/:albumId" component={AlbumPage} />
    </div>
  </ConnectedRouter>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Routes;
