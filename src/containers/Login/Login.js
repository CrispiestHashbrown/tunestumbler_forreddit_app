import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import classes from './Login.css';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alerts/ErrorAlert/Alert';
import Jumbotron from '../../components/UI/Jumbotron/Jumbotron';

class Login extends Component {
    state = {
        controls: {
            email: {
                label: 'Email:',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    message: 'Email is invalid'
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password:',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                    message: 'Password must be between 8 and 30 characters'
                 },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    }

    onEnter = (event) => {
        if (event.key === "Enter") {
            this.submitHandler(event);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Form.Group key={`group-${formElement.id}`}>
                <Form.Label className={classes.LoginLabel} >
                    {formElement.config.label}
                </Form.Label>
                <Input 
                    key={`input-${formElement.id}`}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    validation={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            </Form.Group>
        ));

        let fullForm = 
            <Form className={classes.Login} onKeyPress={this.onEnter} noValidate>
                {form}
                <Button 
                    className={classes.LoginButton} 
                    buttonType="Successful" 
                    clicked={this.submitHandler}>Log in</Button>
            </Form>

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            switch(this.props.error.status) {
                case 403:
                    errorMessage = `Error: Incorrect email or password.`;
                    break;
                case 500:
                    errorMessage = `Error 500: Internal Server Error or Reddit Error. Try again later.`;
                    break;
                default:
                    errorMessage = `Error: Could not resolve login request. Try again later.`;
            }
        }

        let loginRedirect = null;
        if (this.props.isLoggedIn) {
            loginRedirect = <Redirect to="/connect" />
        }

        return (
            <div>
                {loginRedirect}
                <Alert errorMessage={errorMessage} />
                <Jumbotron 
                    jumbotronClass={classes.LoginJumbotron}
                    title='Log in to Tunestumbler!'
                    message='Tunestumbler lets you aggregate music posts from your favourite music subreddits.' 
                    form={fullForm} />
           </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.loginToken !== null,
        loading: state.login.loading,
        error: state.login.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
