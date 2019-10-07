import { cloneDeep } from 'lodash';
import * as actionTypes from '../actionTypes';
import axios from '../../../axios-urls/axios-tunestumbler';

export const resultsGetResultsStart = () => {
    return {
        type: actionTypes.HOT_RESULTS_GET_RESULTS_START
    };
};

export const resultsGetResultsSuccess = (nextUri, afterId, results) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_RESULTS_SUCCESS,
        nextUri: nextUri,
        afterId: afterId,
        results: results
    };
};

export const resultsGetResultsFail = (timestamp, message) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_RESULTS_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const resultsGetNextResultsStart = () => {
    return {
        type: actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_START
    };
};

export const resultsGetNextResultsSuccess = (afterId, updatedResults) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_SUCCESS,
        afterId: afterId,
        updatedResults: updatedResults
    };
};

export const resultsGetNextResultsFail = (timestamp, message) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const hotGetResults = () => {
    return (dispatch) => {
        dispatch(resultsGetResultsStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const userId = localStorage.getItem('userId');
        const uri = `/results/fetch/${userId}/hot`;

        axios.get(uri, {headers})
        .then(response => {
            const resultsResponse = response.data.results;
            const nextUri = resultsResponse[0].nextUri;
            const afterId = resultsResponse[0].afterId;
            const results = [];
            for (let index in resultsResponse) {
                let result = {};
                result.id = resultsResponse[index].resultsId;
                result.subreddit = resultsResponse[index].subreddit;
                result.url = resultsResponse[index].url;
                result.title = resultsResponse[index].title;
                result.permalink = resultsResponse[index].permalink;
                result.score = resultsResponse[index].score;
                result.createdUtc = resultsResponse[index].createdUtc;
                result.domain = resultsResponse[index].domain;
                result.comments = resultsResponse[index].comments;
                results.push(result);
            }

            dispatch(resultsGetResultsSuccess(nextUri, afterId, results));
        })
        .catch(error => {
            error = error.response.data;
            dispatch(resultsGetResultsFail(error.timestamp, error.message));
        });
    };
};

export const hotGetNextResults = (results, nextUri, afterId) => {
    return (dispatch) => {
        dispatch(resultsGetNextResultsStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const postBody = {
            'nextUri': nextUri,
            'afterId': afterId
        };

        const userId = localStorage.getItem('userId');
        const uri = `/results/fetch/next/${userId}`;

        axios.post(uri, postBody, {headers})
        .then(response => {
            const resultsResponse = response.data.results;
            const updatedResults = cloneDeep(results);
            for (let index in resultsResponse) {
                let result = {};
                result.id = resultsResponse[index].resultsId;
                result.subreddit = resultsResponse[index].subreddit;
                result.url = resultsResponse[index].url;
                result.title = resultsResponse[index].title;
                result.permalink = resultsResponse[index].permalink;
                result.score = resultsResponse[index].score;
                result.createdUtc = resultsResponse[index].createdUtc;
                result.domain = resultsResponse[index].domain;
                result.comments = resultsResponse[index].comments;
                updatedResults.push(result);
            }

            const afterId = resultsResponse[0].afterId;
            dispatch(resultsGetNextResultsSuccess(afterId, updatedResults));
        })
        .catch(error => {
            error = error.response.data;
            dispatch(resultsGetNextResultsFail(error.timestamp, error.message));
        });
    };
};