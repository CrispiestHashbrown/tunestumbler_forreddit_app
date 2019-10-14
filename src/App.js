import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Connect from './containers/Connect/Connect';
import Filters from './containers/Filters/Filters';
import NewResults from './containers/Results/NewResults';
import BestResults from './containers/Results/BestResults';
import HotResults from './containers/Results/HotResults';
import TopResults from './containers/Results/TopResults';
import * as actions from './store/actions/index';

export class App extends Component {
  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search);
    const stateString = query.get(`state`);
    const code = query.get(`code`);
    if ((stateString !== null) && (code !== null)) {
      localStorage.setItem('stateString', stateString);
      localStorage.setItem('code', code);
    }

    this.props.onConnectHandlerStart();

    this.props.onTryAutoConnect();
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.props.isLoggedIn && !this.props.isConnected) {
      routes = (
        <Switch>
          <Route path="/connect" component={Connect} />
          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/logout" component={Logout} />
          <Redirect to="/connect" />
        </Switch>
      );
    }
    
    if (this.props.isLoggedIn && this.props.isConnected) {
      routes = (
        <Switch>
          <Route path="/filters" component={Filters} />
          <Route path="/new" component={NewResults} />
          <Route path="/best" component={BestResults} />
          <Route path="/hot" component={HotResults} />
          <Route path="/top" component={TopResults} />
          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/logout" component={Logout} />
          <Redirect to="/filters" />
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
    isLoggedIn: state.login.loginToken !== null,
    isConnected: state.connect.isConnected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onConnectHandlerStart: () => dispatch(actions.connectHandlerStart()),
    onTryAutoConnect: () => dispatch(actions.connectCheckState()),
    onTryAutoLogin: () => dispatch(actions.loginCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
