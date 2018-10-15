import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/es6/set';
import 'core-js/es7/object';
import 'core-js/es6/array';
import 'core-js/fn/array/find';
import Raven from 'raven-js'
import ReactGA from 'react-ga';
import React from 'react';
import ReactDOM from 'react-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let env = runtimeEnv()

if (env.REACT_APP_SENTRY_DSN) {
  Raven.config(
    env.REACT_APP_SENTRY_DSN
  ).install();
}

if (env.REACT_APP_GA_ID) {
  ReactGA.initialize(env.REACT_APP_GA_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
