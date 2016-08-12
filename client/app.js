import ReactDOM from 'react-dom';
import React from 'react';
import {browserHistory } from 'react-router';

import { getOrSetUserId } from './UserId';
import { setupRealtime } from './Realtime';

import routes from '../src/routes';
import store from '../src/store';
import * as actions from '../src/actions/nodeActions';

import Root from '../src/containers/Root';

ReactDOM.render(
  <Root store={store} routing={routes} history={browserHistory} />,
  document.getElementById('app')
);

setupRealtime(store, actions);


store.dispatch(actions.setUserId(getOrSetUserId()));