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

export const resultsGetResultsFail = (error) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_RESULTS_FAIL,
        error: error
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

export const resultsGetNextResultsFail = (error) => {
    return {
        type: actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_FAIL,
        error: error
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

        const uri = `/results/fetch/myresults/hot`;
        axios.get(uri, {headers})
        .then(response => {
            const resultsResponse = response.data.results;
            const nextUri = response.data.nextUri;
            const afterId = response.data.afterId;
            if (!resultsResponse.length) {
                dispatch(hotGetNextResults(resultsResponse, nextUri, afterId));
            } else {
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
            }
        })
        .catch(error => {
            dispatch(resultsGetResultsFail(error.response));
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

        const uri = `/results/fetch/next`;
        axios.post(uri, postBody, {headers})
        .then(response => {
            const newAfterId = response.data.afterId;
            if (!response.data.results.length) {
                dispatch(hotGetNextResults(results, nextUri, newAfterId));
            } else {
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

                dispatch(resultsGetNextResultsSuccess(newAfterId, updatedResults));
            }
        })
        .catch(error => {
            dispatch(resultsGetNextResultsFail(error.response));
        });
    };
};