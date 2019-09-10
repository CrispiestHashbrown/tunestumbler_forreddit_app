import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Connect from './containers/Connect/Connect';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/connect" component={Connect} />
          {/* <Route path="/filters" component={Filters} />
          <Route path="/results" component={Results} />
          <Route path="/settings" component={Settings} /> */}
          <Route path="/logout" component={Logout} />
          {/* <Redirect to="/filters" /> */}
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.loginToken !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.loginCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
