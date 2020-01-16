import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Carousel } from 'react-bootstrap';
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
                    errorMessage = `Connect your Reddit account to continue.`;
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
                <br></br>
                <Button 
                    clicked={this.connectHandler}
                    buttonType="Successful">Connect your Reddit account</Button>
                <br></br>
                <br></br>
                <Carousel>
                    <Carousel.Item>
                        <img 
                            src={require('../../assets/PreferencesHighlighted.png')}
                            className="d-inline-block align-top"
                            alt="Highlighted preferences" />
                        <br></br>
                        <br></br>
                        <p>By visiting your Reddit <mark>preferences</mark></p>
                        <br></br>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img 
                            src={require('../../assets/PermissionsHighlighted.png')}
                            className="d-inline-block align-top"
                            alt="Highlighted permissions" />
                        <br></br>
                        <br></br>
                        <p>You can view allowed <mark>permissions</mark></p>
                        <br></br>
                    </Carousel.Item>
                </Carousel>
                <br></br>
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
