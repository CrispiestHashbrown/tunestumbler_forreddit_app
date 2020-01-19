import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ResultsListItem from './ResultsListItem';

configure({adapter: new Adapter()});

describe('If a result is found, then <ResultsListItem />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ResultsListItem />);
        wrapper.setProps({
            id:  '123',
            score: '223',
            title: 'Test title',
            domain: 'youtube.com',
            date: '1579395373',
            comments: '52',
            subreddit: 'r/Music',
            titleUrl: 'https://www.youtube.com/watch?v=nN_FafYL38Q&feature=youtu.be',
            commentsUrl: 'https://www.reddit.com/r/Music/comments/eqelu8/lara6683_dance_monkey_piano_cover_electropop/'
        });
    });

    it(`should render a <ResultsListItem /> with the correct post score`, () => {
        expect(wrapper.text()).toContain("223");
    });

    it(`should render a <ResultsListItem /> with the correct post title`, () => {
        expect(wrapper.text()).toContain("Test title");
    });

    it(`should render a <ResultsListItem /> with the correct post domain`, () => {
        expect(wrapper.text()).toContain("youtube.com");
    });

    it(`should render a <ResultsListItem /> with the correct post timestamp`, () => {
        expect(wrapper.text()).toContain("4:56PM January 18th, 2020");
    });

    it(`should render a <ResultsListItem /> with the correct link to the post comments`, () => {
        expect(wrapper.text()).toContain("52 comments");
    });
});