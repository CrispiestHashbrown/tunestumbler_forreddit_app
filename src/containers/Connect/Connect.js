import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Connect.css';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Connect extends Component {
    componentDidMount = () => {
        this.props.onRefreshToken();

        if (this.props.stateString && this.props.code) {
            this.props.onConnectHandler(this.props.stateString, this.props.code);
        }
    }

    connectHandler = (event) => {
        event.preventDefault();
        this.props.onConnect();
    }

    render () {
        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            switch(this.props.error.status) {
                case 400:
                case 401:
                case 404:
                    errorMessage = `Error: Bad request.`;
                    break;
                case 500:
                    errorMessage = `Error: Internal Server Error or Reddit Error. Try again later.`;
                    break;
                default:
                    errorMessage = null;
            }
        }

        let connectRedirect = null;
        if (this.props.isConnected) {
            connectRedirect = <Redirect to="/filters" />
        }

        return (
            <div className={classes.Connect}>
                {connectRedirect}
                {errorMessage}
                <br></br>
                <p>By clicking the 'Connect your Reddit account' button,</p>
                <p>You agree to grant Tunestumbler.com the</p>
                <p>following permissions (scopes) to your Reddit account:</p>
                <ul>
                    <li>read</li>
                    <li>history</li>
                    <li>vote</li>
                    <li>save</li>
                    <li>account</li>
                    <li>subscribe</li>
                    <li>mysubreddits</li>
                </ul>
                <br></br>
                <br></br>
                <p>You may review these permissions or unauthorize</p>
                <p>Tunestumbler.com at any time by visiting </p>
                <p>Reddit preferences>apps and clicking revoke access</p>

                <Button 
                    clicked={this.connectHandler}
                    buttonType="Successful">Connect your Reddit account</Button>
                {spinner}
           </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConnected: state.connect.isConnected,
        stateString: state.connect.stateString,
        code: state.connect.code,
        loading: state.connect.loading,
        error: state.connect.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshToken: () => dispatch(actions.refreshToken()),
        onConnectHandler: (stateString, code) => dispatch(actions.connectHandler(stateString, code)),
        onConnect: () => dispatch(actions.connect())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
