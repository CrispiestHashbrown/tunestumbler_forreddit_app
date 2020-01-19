import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import signupReducer from './store/reducers/signup';
import loginReducer from './store/reducers/login';
import connectReducer from './store/reducers/connect';
import filtersReducer from './store/reducers/filters';
import newResultsReducer from './store/reducers/results/newResults';
import bestResultsReducer from './store/reducers/results/bestResults';
import hotResultsReducer from './store/reducers/results/hotResults';
import topResultsReducer from './store/reducers/results/topResults';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    connect: connectReducer,
    filters: filtersReducer,
    newResults: newResultsReducer,
    bestResults: bestResultsReducer,
    hotResults: hotResultsReducer,
    topResults: topResultsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
