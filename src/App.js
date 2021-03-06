import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './app/reducers';
import { CoreLayout, Home } from './app/components';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(reducer, DevTools.instrument());
const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={CoreLayout}>
              <IndexRoute component={Home} />
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default App;
