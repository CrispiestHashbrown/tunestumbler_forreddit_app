import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import classes from './Results.css';
import * as actions from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ResultsListItem from '../../components/Results/ResultsListItem/ResultsListItem';
import Spinner from '../../components/UI/Spinner/Spinner';

class Results extends Component {
    componentDidMount() {
        this.props.onGetResults(this.props.location.pathname);
    }

    getNextResultsHandler = () => {
        this.props.onGetNextResults(this.props.results, this.props.nextUri, this.props.afterId);
    }

    render () {
        let resultsList = [];
        if (this.props.results.length > 0 && this.props.didGetResults) {
            let resultsListArray = [];
            for (let index in this.props.results) {
                const redditBaseUrl = 'https://www.reddit.com';
                resultsListArray.push(
                    <ResultsListItem 
                        id={this.props.results[index].resultsId}
                        score={this.props.results[index].score}
                        title={this.props.results[index].title}
                        domain={this.props.results[index].domain}
                        date={this.props.results[index].createdUtc}
                        comments={this.props.results[index].comments}
                        subreddit={this.props.results[index].subreddit}
                        titleUrl={this.props.results[index].url}
                        commentsUrl={`${redditBaseUrl}${this.props.results[index].permalink}`}/>
                );
            }

            resultsList = resultsListArray;
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

        let loading = null;
        if (this.props.loading) {
            loading = <Spinner />
        }

        return (
            <Auxiliary className={classes.Results}>
                {errorMessage}
                {loading}
                <InfiniteScroll
                    dataLength={resultsList.length}
                    next={this.getNextResultsHandler}
                    hasMore={this.props.afterId}
                    loader={<Spinner />}
                    endMessage={
                        <p>End of results.</p>
                    }>
                    {resultsList}
                </InfiniteScroll>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        didGetResults: state.topResults.didGetResults,
        results: state.topResults.results,
        nextUri: state.topResults.nextUri,
        afterId: state.topResults.afterId,
        didGetNextResults: state.topResults.didGetNextResults,
        timestamp: state.topResults.timestamp,
        message: state.topResults.message,
        loading: state.topResults.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetResults: (resultsRoute) => dispatch(actions.topGetResults(resultsRoute)),
        onGetNextResults: (results, nextUri, afterId) => dispatch(actions.topGetNextResults(results, nextUri, afterId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);

