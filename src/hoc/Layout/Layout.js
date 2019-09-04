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
                    isLoggedIn={this.props.isLoggedIn} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.token !== null
    };
};

export default connect(mapStateToProps)(Layout);