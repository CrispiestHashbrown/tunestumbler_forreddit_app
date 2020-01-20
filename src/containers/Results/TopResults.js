import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as actions from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ResultsListItem from '../../components/Results/ResultsListItem/ResultsListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alerts/ErrorAlert/Alert';

class TopResults extends Component {
    componentDidMount() {
        this.props.onGetResults();
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
                        key={this.props.results[index].id}
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

        let errorMessage = '';
        if (this.props.error) {
            switch(this.props.error.status) {
                case 400:
                case 401:
                    errorMessage = `Sorry, no results found. Try adjusting your filters.`;
                    break;
                case 404:
                    errorMessage = `Error 404: No results found. Make sure you set your filters.`;
                    break;
                case 500:
                    errorMessage = `Error 500: Internal Server Error or Reddit Error. Try again later.`;
                    break;
                default:
                    errorMessage = '';
            }
        }

        let loading = null;
        if (this.props.loading) {
            loading = <Spinner />
        }

        return (
            <Auxiliary>
                <Alert errorMessage={errorMessage}/>
                {loading}
                <InfiniteScroll
                    dataLength={resultsList.length}
                    next={this.getNextResultsHandler}
                    hasMore={this.props.afterId}
                    loader={<Spinner />}
                    endMessage={
                        <p><b>End of results.</b></p>
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
        error: state.topResults.error,
        loading: state.topResults.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetResults: () => dispatch(actions.topGetResults()),
        onGetNextResults: (results, nextUri, afterId) => dispatch(actions.topGetNextResults(results, nextUri, afterId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopResults);

