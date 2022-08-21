import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

// Routing
import Body from './Body';

// CSS - controlled by /scss
import './css/main.css';

// Redux
import { Provider } from 'react-redux';
import store from './store'

// Components - imported
import AlertContainer from './components/common/Alerts/AlertContainer';

const App = () => {
  // const initializeAnalytics = () => {
  //   mixpanel.init("11816df608da757ffc52b75577e9e9a4", {
  //     debug: true
  //   });
  // }

  // useEffect(() => {
  //   initializeAnalytics();
  // }, []);

  return (
    <Provider store={store}>
      <Router>

        <Switch>
          <Body />
        </Switch>

        <AlertContainer />
      </Router>
    </Provider>
  );
}

export default App;
