import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('If not logged in, then <NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it(`should render two '<NavigationItem />' elements`, () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it(`should render the 'Log in' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/login">Log in</NavigationItem>))
            .toEqual(true);
    });

    it(`should render the 'Sign up' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/signup">Sign up</NavigationItem>))
            .toEqual(true);
    });
});

describe('If logged in and not connected, then <NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
        wrapper.setProps({isLoggedIn: true});
    });

    it(`should render three '<NavigationItem />' elements`, () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it(`should render the 'Connect' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/connect">Connect</NavigationItem>))
            .toEqual(true);
    });

    // it(`should render the 'Settings' element`, () => {
    //     expect(wrapper.contains(<NavigationItem link="/settings">Settings</NavigationItem>))
    //         .toEqual(true);
    // });

    it(`should render the 'Logout' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
            .toEqual(true);
    });
});

describe('If logged in and connected, then <NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
        wrapper.setProps({isLoggedIn: true, isConnected: true});
    });

    it(`should render seven '<NavigationItem />' elements`, () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(6);
    });

    it(`should render the 'New' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/new">New</NavigationItem>))
            .toEqual(true);
    });

    it(`should render the 'Top' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/top">Top</NavigationItem>))
            .toEqual(true);
    });

    it(`should render the 'Hot' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/hot">Hot</NavigationItem>))
            .toEqual(true);
    });

    it(`should render the 'Best' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/best">Best</NavigationItem>))
            .toEqual(true);
    });

    it(`should render the 'Filters' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/filters">Filters</NavigationItem>))
            .toEqual(true);
    });

    // it(`should render the 'Settings' element`, () => {
    //     expect(wrapper.contains(<NavigationItem link="/settings">Settings</NavigationItem>))
    //         .toEqual(true);
    // });

    it(`should render the 'Logout' element`, () => {
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
            .toEqual(true);
    });
});