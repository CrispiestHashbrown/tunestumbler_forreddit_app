import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not logged in', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if logged in and not connected', () => {
        wrapper.setProps({isLoggedIn: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render seven <NavigationItem /> elements if logged in and connected', () => {
        wrapper.setProps({isLoggedIn: true, isConnected: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(7);
    });
});