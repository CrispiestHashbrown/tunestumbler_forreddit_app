import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import uuid from 'uuid';

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
            elementDisplay: 'normal',
            elementType: 'select',
            elementConfig: {
                placeholder: '<subreddit>'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 21,
                minLength: 1
            },
            valid: false,
            touched: true
        },
        minScore: {
            elementDisplay: 'small',
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
                minLength: 0
            },
            valid: false,
            touched: false
        },
        hideByDomain: {
            elementDisplay: 'normal',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<hide by domain>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 15,
                minLength: 0
            },
            valid: false,
            touched: false
        },
        hideByKeyword: {
            elementDisplay: 'normal',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<hide by keyword>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 50,
                minLength: 0
            },
            valid: false,
            touched: false
        },
        showByDomain: {
            elementDisplay: 'normal',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<only show from domain>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 15,
                minLength: 0
            },
            valid: false,
            touched: false
        },
        showByKeyword: {
            elementDisplay: 'normal',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '<only show by keyword>'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 50,
                minLength: 0
            },
            valid: false,
            touched: false
        }
    }

    state = {
        controls: {
            subreddit: {
                elementDisplay: 'normal',
                elementType: 'select',
                elementConfig: {
                    placeholder: '<subreddit>'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 21,
                    minLength: 1
                },
                valid: false,
                touched: true
            },
            minScore: {
                elementDisplay: 'small',
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
                    minLength: 0
                },
                valid: false,
                touched: false
            },
            hideByDomain: {
                elementDisplay: 'normal',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<hide by domain>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 15,
                    minLength: 0
                },
                valid: false,
                touched: false
            },
            hideByKeyword: {
                elementDisplay: 'normal',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<hide by keyword>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 50,
                    minLength: 0
                },
                valid: false,
                touched: false
            },
            showByDomain: {
                elementDisplay: 'normal',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<only show from domain>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 15,
                    minLength: 0
                },
                valid: false,
                touched: false
            },
            showByKeyword: {
                elementDisplay: 'normal',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '<only show by keyword>'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 50,
                    minLength: 0
                },
                valid: false,
                touched: false
            }
        },
        subreddits: [],
        filters: [],
        shouldUpdateFilters: false,
        shouldCreateFilters: false
    }

    getSubreddits () {
        this.props.onGetSubredditsStart();

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };

        const userId = localStorage.getItem('userId');
        const uri = `/aggregate/update/${userId}`;
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
                error = error.response.data;
                this.props.onGetSubredditsFail(error.timestamp, error.message);
            });
    }

    getFilters() {
        this.props.onGetFiltersStart();

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };

        const userId = localStorage.getItem('userId');
        const uri = `/filters/${userId}`;
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
                        new: false,
                        controls: initialControls
                    });
                }

                this.setState({
                    filters: filters
                });

                this.props.onGetFiltersSuccess();
            })
            .catch(error => {
                error = error.response.data;
                this.props.onGetFiltersFail(error.timestamp, error.message);
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
            new: true,
            controls: controls
        };

        filters.unshift(newFilters);

        this.setState({
            filters: filters
        });

        this.clearControlsHandler();
    }

    removeControlsHandler = (filtersId) => {
        const index = this.state.filters.findIndex(filter => filter.id === filtersId);
        const filterToRemove = cloneDeep(this.state.filters[index]);
        
        this.setState({
            filters: this.state.filters.filter((filter) => {
                return filter.id !== filterToRemove.id
            })
        });
    }

    sendUpdatedFiltersToApi() {
        let filtersToUpdate = [];
        if (this.state.subreddits.length > 0) {
            let stateFiltersToUpdate = cloneDeep(this.state.filters)
                .filter((filter) => {
                    return filter.new === false
                });

            for (let filter in stateFiltersToUpdate) {
                filtersToUpdate.push({
                    filtersId: stateFiltersToUpdate[filter].id,
                    userId: localStorage.getItem('userId'),
                    multireddit: null,
                    subreddit: stateFiltersToUpdate[filter].controls.subreddit.value,
                    minScore: stateFiltersToUpdate[filter].controls.minScore.value,
                    priority: 0,
                    allowNSFWFlag: false,
                    hideByKeyword: stateFiltersToUpdate[filter].controls.hideByKeyword.value,
                    showByKeyword: stateFiltersToUpdate[filter].controls.showByKeyword.value,
                    hideByDomain: stateFiltersToUpdate[filter].controls.hideByDomain.value,
                    showByDomain: stateFiltersToUpdate[filter].controls.showByDomain.value
                });
            }
        }

        if (filtersToUpdate.length > 0) {
            this.setState({
                shouldUpdateFilters: true
            });

            this.props.onUpdateFilters(filtersToUpdate);
        }
    }

    sendNewFiltersToApi() {
        let filtersToCreate = [];
        if (this.state.subreddits.length > 0) {
            let stateFiltersToCreate = cloneDeep(this.state.filters)
                .filter((filter) => {
                    return filter.new === true
                });

            for (let filter in stateFiltersToCreate) {
                filtersToCreate.push({
                    filtersId: null,
                    userId: localStorage.getItem('userId'),
                    multireddit: null,
                    subreddit: stateFiltersToCreate[filter].controls.subreddit.value,
                    minScore: stateFiltersToCreate[filter].controls.minScore.value,
                    priority: 0,
                    allowNSFWFlag: false,
                    hideByKeyword: stateFiltersToCreate[filter].controls.hideByKeyword.value,
                    showByKeyword: stateFiltersToCreate[filter].controls.showByKeyword.value,
                    hideByDomain: stateFiltersToCreate[filter].controls.hideByDomain.value,
                    showByDomain: stateFiltersToCreate[filter].controls.showByDomain.value
                });
            }
        }

        if (filtersToCreate.length > 0) {
            this.setState({
                shouldCreateFilters: true
            });
            
            this.props.onCreateFilters(filtersToCreate);
        }
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
    }

    render () {
        let controlsForm = (elementsArray, keyPrefix, shouldEnable) => {
            return (
                <Auxiliary>
                    {elementsArray.map(controlElement => (
                        <Input 
                            key={`${keyPrefix}${controlElement.id}`}
                            keyPrefix={keyPrefix}
                            elementDisplay={controlElement.config.elementDisplay}
                            elementType={controlElement.config.elementType}
                            elementConfig={controlElement.config.elementConfig}
                            options={this.state.subreddits}
                            value={controlElement.config.value}
                            invalid={!controlElement.config.valid}
                            shouldValidate={controlElement.config.validation}
                            touched={controlElement.config.touched}
                            disabled={!shouldEnable}
                            changed={(event) => this.controlsChangedHandler(event, keyPrefix, controlElement.id)} />))}
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
            <Auxiliary>
                {controlsForm(controlsElementsArray, createFiltersPrefix, this.props.didGetSubreddits)}
                <Button 
                    buttonType="Successful" 
                    disabled={!this.state.controls.subreddit.value}
                    clicked={this.addControlsHandler}>+</Button>
                <Button buttonType="Successful" clicked={this.clearControlsHandler}>-</Button>
            </Auxiliary>;

        let filtersForm = null;
        if (this.props.loading) {
            filtersForm = <Spinner />
        }

        const filtersFormArray = [];
        if (this.state.filters.length > 0 && this.props.didGetFilters) {
            for (let index in this.state.filters) {
                const filterElementsArray = [];
                for (let key in this.state.filters[index].controls) {
                    filterElementsArray.push({
                        filtersId: this.state.filters[index].id,
                        id: key,
                        config: this.state.filters[index].controls[key]
                    });
                }

                filtersFormArray.push(
                    <Auxiliary key={filterElementsArray[0].filtersId}>
                        <Auxiliary>
                            {controlsForm(filterElementsArray, filterElementsArray[0].filtersId, this.props.didGetFilters)}
                        </Auxiliary>
                        <Auxiliary>
                            <Button buttonType="Successful" clicked={() => this.removeControlsHandler(filterElementsArray[0].filtersId)}>-</Button>
                        </Auxiliary>
                    </Auxiliary>
                );
            }

            filtersForm = filtersFormArray;
        }            

        let errorMessage = null;
        if (this.props.timestamp && this.props.message) {
            errorMessage = (
                <Auxiliary>
                    <p>Timestamp: {this.props.timestamp}</p>
                    <p>Error: {this.props.message}</p>
                </Auxiliary>
            );
        }

        let filtersRedirect = null;
        if ((this.state.shouldUpdateFilters && this.props.didUpdateFilters) || (this.state.shouldCreateFilters && this.props.didCreateFilters)) {
            filtersRedirect = <Redirect to="/new" />
        }

        return (
            <Auxiliary className={classes.Filters}>
                {filtersRedirect}
                {errorMessage}
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
        timestamp: state.filters.timestamp,
        message: state.filters.message,
        loading: state.filters.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSubredditsStart: () => dispatch(actions.filtersGetSubredditsStart()),
        onGetSubredditsSuccess: () => dispatch(actions.filtersGetSubredditsSuccess()),
        onGetSubredditsFail: (timestamp, message) => dispatch(actions.filtersGetSubredditsFail(timestamp, message)),
        onGetFiltersStart: () => dispatch(actions.filtersGetStart()),
        onGetFiltersSuccess: () => dispatch(actions.filtersGetSuccess()),
        onGetFiltersFail: (timestamp, message) => dispatch(actions.filtersGetFail(timestamp, message)),
        onUpdateFilters: (filtersToUpdate) => dispatch(actions.updateFilters(filtersToUpdate)),
        onCreateFilters: (filtersToCreate) => dispatch(actions.createFilters(filtersToCreate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

