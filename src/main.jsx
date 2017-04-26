import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/modules';
import Login from '@/components/Login';

ReactDOM.render(<Provider store={store}><Login /></Provider>, document.getElementById('app'));
