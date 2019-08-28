import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <Switch>
              {/* <Route path="/" component={Auth/Results} /> */}
              <Route path="/auth" component={Auth} />
              {/* <Route path="/signup" component={Signup} />
              <Route path="/connect" component={Connect} />
              <Route path="/filters" component={Filters} />
              <Route path="/results" component={Results} />
              <Route path="/account" component={Account} /> */}
            </Switch>
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
