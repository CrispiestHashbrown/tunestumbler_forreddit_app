import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            {/* <Route path="/connect" component={Connect} />
            <Route path="/filters" component={Filters} />
            <Route path="/results" component={Results} />
            <Route path="/settings" component={Settings} /> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
