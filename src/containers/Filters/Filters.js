import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import uuid from 'uuid';

import { ButtonToolbar, Col, Form } from 'react-bootstrap';
import classes from './Filters.css';
import * as actions from '../../store/actions/index';
import axios from '../../axios-urls/axios-tunestumbler';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Filters extends Component {
    componentDidMount() {
        this.getSubreddits();
    }

    initialControlValues = {
        subreddit: {
            elementType: 'select',
            elementConfig: {
                placeholder: '<subreddit>'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 21,
                minLength: 1,
                message: 'Subreddit is required'
            },
            isValid: false,
            touched: true
        },
        minScore: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: '<min score>'
            },
            value: '',
            validation: {
                required: false,
                isNumeric: true,
                minValue: 1,
                maxValue: 99999999,
                minLength: 0,
                message: 'Invalid score value'
            },
            isValid: false,
            touched: false
        },
        hideByDomain: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<hide by domain>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 15,
                minLength: 0,
                message: 'Domain is too long'
            },
            isValid: false,
            touched: false
        },
        hideByKeyword: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<hide by keyword>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 50,
                minLength: 0,
                message: 'Keyword is too long'
            },
            isValid: false,
            touched: false
        },
        showByDomain: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<show by domain>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 15,
                minLength: 0,
                message: 'Domain is too long'
            },
            isValid: false,
            touched: false
        },
        showByKeyword: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<show by keyword>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 50,
                minLength: 0,
                message: 'Keyword is too long'
            },
            isValid: false,
            touched: false
        }
    }

    state = {
        controls: {
            subreddit: {
                elementType: 'select',
                elementConfig: {
                    placeholder: '<subreddit>'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 21,
                    minLength: 1,
                    message: 'Subreddit is required'
                },
                isValid: false,
                touched: true
            },
            minScore: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: '<min score>'
                },
                value: '',
                validation: {
                    required: false,
                    isNumeric: true,
                    minValue: 1,
                    maxValue: 99999999,
                    minLength: 0,
                    message: 'Invalid score value'
                },
                isValid: false,
                touched: false
            },
            hideByDomain: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<hide by domain>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 15,
                    minLength: 0,
                    message: 'Domain is too long'
                },
                isValid: false,
                touched: false
            },
            hideByKeyword: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<hide by keyword>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 50,
                    minLength: 0,
                    message: 'Keyword is too long'
                },
                isValid: false,
                touched: false
            },
            showByDomain: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<show by domain>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 15,
                    minLength: 0,
                    message: 'Domain is too long'
                },
                isValid: false,
                touched: false
            },
            showByKeyword: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<show by keyword>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 50,
                    minLength: 0,
                    message: 'Keyword is too long'
                },
                isValid: false,
                touched: false
            }
        },
        subreddits: [],
        filters: []
    }

    getSubreddits () {
        this.props.onGetSubredditsStart();

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };

        const uri = `/aggregate/myaggregate`;
        axios.get(uri, {headers})
            .then(response => {
                const subredditsResponse = response.data.aggregate;
                const subreddits = ['<No subreddits>'];
                for (let index in subredditsResponse) {
                    let id = subredditsResponse[index].subredditId ? 
                        subredditsResponse[index].subredditId : subredditsResponse[index].multiredditId;
                    subreddits.push({
                        key: id, 
                        value: subredditsResponse[index].subreddit
                    });
                }

                this.setState({
                    subreddits: subreddits
                });

                this.props.onGetSubredditsSuccess();
                this.getFilters();

            })
            .catch(error => {
                this.props.onGetSubredditsFail(error.response);
            });
    }

    getFilters() {
        this.props.onGetFiltersStart();

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };

        const uri = `/filters/myfilters`;
        axios.get(uri, {headers})
            .then(response => {
                const filtersResponse = response.data.filters;
                const filters = [];
                for (let index in filtersResponse) {
                    let initialControls = cloneDeep(this.initialControlValues);
                    initialControls.subreddit.value = filtersResponse[index].subreddit;
                    initialControls.subreddit.valid = 
                        this.checkValidity(filtersResponse[index].subreddit, initialControls.subreddit.validation);
                    initialControls.minScore.value = filtersResponse[index].minScore;
                    initialControls.hideByKeyword.value = filtersResponse[index].hideByKeyword;
                    initialControls.showByKeyword.value = filtersResponse[index].showByKeyword;
                    initialControls.hideByDomain.value = filtersResponse[index].hideByDomain;
                    initialControls.showByDomain.value = filtersResponse[index].showByDomain;

                    filters.push({
                        id: filtersResponse[index].filtersId,
                        isNew: false,
                        isActive: filtersResponse[index].isActive,
                        controls: initialControls
                    });
                }

                this.setState({
                    filters: filters
                });

                this.props.onGetFiltersSuccess();
            })
            .catch(error => {
                this.props.onGetFiltersFail(error.response);
            });
    }

    clearControlsHandler = () => {
        const initialControls = cloneDeep(this.initialControlValues);

        this.setState({
            controls: initialControls
        });
    }

    addControlsHandler = () => {
        let filters = cloneDeep(this.state.filters);
        let controls = cloneDeep(this.state.controls);
        let newFilters = {
            id: uuid.v4(),
            isNew: true,
            isActive: true,
            controls: controls
        };

        filters.unshift(newFilters);

        this.setState({
            filters: filters
        });

        this.clearControlsHandler();
    }

    // Set `isActive` property to false for removed filters
    removeControlsHandler = (filtersId) => {
        const index = this.state.filters.findIndex(filter => filter.id === filtersId);
        let filters = cloneDeep(this.state.filters);
        filters[index].isActive = false;

        this.setState({
            filters: filters
        });
    }

    sendUpdatedFiltersToApi() {
        let filtersToUpdate = [];
        if (this.state.subreddits.length > 0) {
            let stateFiltersToUpdate = cloneDeep(this.state.filters)
                .filter((filter) => {
                    return filter.isNew === false
                });

            for (let filter in stateFiltersToUpdate) {
                filtersToUpdate.push({
                    filtersId: stateFiltersToUpdate[filter].id,
                    multireddit: '',
                    subreddit: stateFiltersToUpdate[filter].controls.subreddit.value,
                    minScore: stateFiltersToUpdate[filter].controls.minScore.value,
                    priority: 0,
                    allowNSFWFlag: false,
                    hideByKeyword: stateFiltersToUpdate[filter].controls.hideByKeyword.value,
                    showByKeyword: stateFiltersToUpdate[filter].controls.showByKeyword.value,
                    hideByDomain: stateFiltersToUpdate[filter].controls.hideByDomain.value,
                    showByDomain: stateFiltersToUpdate[filter].controls.showByDomain.value,
                    isActive: stateFiltersToUpdate[filter].isActive
                });
            }
        }

        this.props.onUpdateFilters(filtersToUpdate);
    }

    sendNewFiltersToApi() {
        let filtersToCreate = [];
        if (this.state.subreddits.length > 0) {
            let stateFiltersToCreate = cloneDeep(this.state.filters)
                .filter((filter) => {
                    return filter.isNew === true
                });

            for (let filter in stateFiltersToCreate) {
                filtersToCreate.push({
                    filtersId: null,
                    multireddit: '',
                    subreddit: stateFiltersToCreate[filter].controls.subreddit.value,
                    minScore: stateFiltersToCreate[filter].controls.minScore.value,
                    priority: 0,
                    allowNSFWFlag: false,
                    hideByKeyword: stateFiltersToCreate[filter].controls.hideByKeyword.value,
                    showByKeyword: stateFiltersToCreate[filter].controls.showByKeyword.value,
                    hideByDomain: stateFiltersToCreate[filter].controls.hideByDomain.value,
                    showByDomain: stateFiltersToCreate[filter].controls.showByDomain.value,
                    isActive: stateFiltersToCreate[filter].isActive
                });
            }
        }
        
        this.props.onCreateFilters(filtersToCreate);
    }

    searchHandler = (event) => {
        event.preventDefault();
        this.sendUpdatedFiltersToApi();
        this.sendNewFiltersToApi();
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
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.minValue && value) {
            isValid = value >= rules.minValue && isValid;
        }

        if (rules.maxValue) {
            isValid = value <= rules.maxValue && isValid;
        }

        return isValid;
    }

    // Update createFilterControls values
    controlsChangedHandler = (event, keyPrefix, controlName) => {
        if (keyPrefix === '') {
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
        } else {
            this.filtersChangedHandler(event, keyPrefix, controlName);
        }
    }

    // Update filtersFormControls values
    filtersChangedHandler = (event, keyPrefix, controlName) => {
        const index = this.state.filters.findIndex(filter => filter.id === keyPrefix);
        let filters = cloneDeep(this.state.filters);
        filters[index].controls[controlName] = {
            ...this.state.filters[index].controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.filters[index].controls[controlName].validation),
            touched: true
        };

        this.setState({ 
            filters: filters 
        });
    }

    render () {
        let controlsForm = (elementsArray, keyPrefix, shouldEnable) => {
            return (
                <Auxiliary>
                    {elementsArray.map(controlElement => (
                        <Form.Group as={Col} lg="2">
                            <Input 
                                key={`${keyPrefix}${controlElement.id}`}
                                keyPrefix={keyPrefix}
                                elementType={controlElement.config.elementType}
                                elementConfig={controlElement.config.elementConfig}
                                options={this.state.subreddits}
                                value={controlElement.config.value}
                                invalid={!controlElement.config.valid}
                                touched={controlElement.config.touched}
                                disabled={!shouldEnable}
                                changed={(event) => this.controlsChangedHandler(event, keyPrefix, controlElement.id)} />
                        </Form.Group>))}
                </Auxiliary>
            )
        };

        const controlsElementsArray = [];
        for (let key in this.state.controls) {
            controlsElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const createFiltersPrefix = '';
        let createFiltersForm = 
            <Form>
                <Form.Row>
                    {controlsForm(controlsElementsArray, createFiltersPrefix, this.props.didGetSubreddits)}
                    <ButtonToolbar>
                        <Button 
                            buttonType="Successful" 
                            disabled={!this.state.controls.subreddit.value}
                            clicked={this.addControlsHandler}>+</Button>
                        <Button buttonType="Successful" clicked={this.clearControlsHandler}>-</Button>
                    </ButtonToolbar>
                </Form.Row>
            </Form>;

        let filtersForm = null;
        if (this.props.loading) {
            filtersForm = <Spinner />
        }

        // If there are new or pre-existing filters
        // Then for every filter that is active
        // Dynamically push controls to the form
        const filtersFormArray = [];
        if (this.state.filters.length > 0 && this.props.didGetFilters) {
            for (let index in this.state.filters) {
                if (this.state.filters[index].isActive) {
                    const filterElementsArray = [];
                    for (let key in this.state.filters[index].controls) {
                        filterElementsArray.push({
                            filtersId: this.state.filters[index].id,
                            id: key,
                            config: this.state.filters[index].controls[key]
                        });
                    }
    
                    filtersFormArray.push(
                        <Form.Row key={filterElementsArray[0].filtersId}>
                            {controlsForm(filterElementsArray, filterElementsArray[0].filtersId, this.props.didGetFilters)}
                            <ButtonToolbar>
                                <Button buttonType="Successful" clicked={() => this.removeControlsHandler(filterElementsArray[0].filtersId)}>-</Button>
                            </ButtonToolbar>
                        </Form.Row>
                    );
                }
            }

            filtersForm = filtersFormArray;
        }

        let errorMessage = null;
        if (this.props.error) {
            switch(this.props.error.status) {
                case 400:
                case 401:
                    errorMessage = `Error: Bad request. Could not save filters.`;
                    break;
                case 404:
                    errorMessage = `Error: No subreddits found on your Reddit account.`;
                    break;
                case 500:
                    errorMessage = `Error: Internal Server Error or Reddit Error. Try again later.`;
                    break;
                default:
                    errorMessage = null;
            }
        }

        let filtersRedirect = null;
        if (this.props.didUpdateFilters && this.props.didCreateFilters) {
            this.props.onResetFiltersState();
            filtersRedirect = <Redirect to="/new" />
        }

        return (
            <Auxiliary className={classes.Filters}>
                {filtersRedirect}
                {createFiltersForm}                    
                <hr />
                {filtersForm}
                <Button 
                    key='search' 
                    buttonType="Successful" 
                    classes={[classes.FloatRight].join(' ')}
                    clicked={(event) => this.searchHandler(event)}>Save and Search</Button>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        didGetSubreddits: state.filters.didGetSubreddits,
        didGetFilters: state.filters.didGetFilters,
        didUpdateFilters: state.filters.didUpdateFilters,
        didCreateFilters: state.filters.didCreateFilters,
        error: state.filters.error,
        loading: state.filters.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSubredditsStart: () => dispatch(actions.filtersGetSubredditsStart()),
        onGetSubredditsSuccess: () => dispatch(actions.filtersGetSubredditsSuccess()),
        onGetSubredditsFail: (error) => dispatch(actions.filtersGetSubredditsFail(error)),
        onGetFiltersStart: () => dispatch(actions.filtersGetStart()),
        onGetFiltersSuccess: () => dispatch(actions.filtersGetSuccess()),
        onGetFiltersFail: (error) => dispatch(actions.filtersGetFail(error)),
        onUpdateFilters: (filtersToUpdate) => dispatch(actions.updateFilters(filtersToUpdate)),
        onCreateFilters: (filtersToCreate) => dispatch(actions.createFilters(filtersToCreate)),
        onResetFiltersState: () => dispatch(actions.resetFiltersState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

