import React from 'react';
import Header from '@/components/ui/Header';
import Main from '@/pages';

const App = () => (
  <div>
    <Header />
    <Main />
    {/*<ModalSwitcher>
      <LoginModal key={LOGIN_MODAL} />
      <SigninModal key={SIGNIN_MODAL} />
      <Confirm key={CONFIRM_MODAL} />
    </ModalSwitcher>*/}
    {/*<Dialog />*/}
  </div>
);

export default App;
