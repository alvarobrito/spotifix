import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// Components
import SearchContainer from '@/containers/SearchContainer';
// import Dialog from '@/containers/DialogContainer';
import Header from '@/components/ui/Header';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ArtistsPage from '@/pages/ArtistsPage';
import ArtistPage from '@/pages/ArtistPage';
import AlbumPage from '@/pages/AlbumPage';

const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Header />
      {/*<ModalSwitcher>
        <LoginModal key={LOGIN_MODAL} />
        <SigninModal key={SIGNIN_MODAL} />
        <Confirm key={CONFIRM_MODAL} />
      </ModalSwitcher>*/}
      {/*<Dialog />*/}
      <Route exact path="/" component={HomePage} />
      <Route path="/songs" component={SearchContainer} />
      <Route path="/login" component={LoginPage} />
      <Route path="/artists/:genre" exact component={ArtistsPage} />
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
