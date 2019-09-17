import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render () {
        return (
            <Auxiliary>
                <Toolbar 
                    isLoggedIn={this.props.isLoggedIn}
                    isConnected={this.props.isConnected} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.loginToken !== null,
        isConnected: state.connect.isConnected
    };
};

export default connect(mapStateToProps)(Layout);