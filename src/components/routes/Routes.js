import React, { Fragment } from 'react';

// Routing
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Pages
import Default from './Default';
import Profile from '../../pages/Profile';

const Routes = () => {

  return (
    <Fragment>
        <Switch>
            <Route exact path="/" component={Profile} />
            <PrivateRoute exact path="/faqs" component={Profile} />
            {/* Page not found */}
            <Route component={Default} />
        </Switch>
    </Fragment>
  );
};

export default Routes;
