import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';

import ResultsListItem from './ResultsListItem';

configure({adapter: new Adapter()});

describe('If a result is found, then <ResultsListItem />', () => {
    const resultsTest = {
        id:  '123',
        score: '223',
        title: 'Test title',
        domain: 'youtube.com',
        date: '1579395373',
        comments: '52',
        subreddit: 'Music',
        titleUrl: 'https://www.youtube.com/watch?v=nN_FafYL38Q&feature=youtu.be',
        commentsUrl: 'https://www.reddit.com/r/Music/comments/eqelu8/lara6683_dance_monkey_piano_cover_electropop/'
    };
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ResultsListItem />);
        wrapper.setProps(resultsTest);
    });

    it(`should render a <ResultsListItem /> with the correct post score`, () => {
        expect(wrapper.text()).toContain(resultsTest.score);
    });

    it(`should render a <ResultsListItem /> with the correct post title`, () => {
        expect(wrapper.text()).toContain(resultsTest.title);
    });

    it(`should render a <ResultsListItem /> with the correct post domain`, () => {
        expect(wrapper.text()).toContain(resultsTest.domain);
    });

    it(`should render a <ResultsListItem /> with the correct post timestamp`, () => {
        expect(wrapper.text()).toContain(moment.unix(resultsTest.date).format(' h:mmA MMMM Do, YYYY'));
    });

    it(`should render a <ResultsListItem /> with the correct link to the post comments`, () => {
        expect(wrapper.text()).toContain(`${resultsTest.comments} comments`);
    });
});