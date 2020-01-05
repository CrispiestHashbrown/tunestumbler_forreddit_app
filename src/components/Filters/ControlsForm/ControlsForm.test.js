import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ControlsForm from './ControlsForm';
import { Col, Form, FormControl, FormRow } from 'react-bootstrap/Form';

configure({adapter: new Adapter()});

describe('<ControlsForm />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ControlsForm />);
    });

    it('should render one Form element', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render one FormRow element', () => {
        expect(wrapper.find(FormRow)).toHaveLength(1);
    });

    it('should render six <Col> elements', () => {
        expect(wrapper.find(Col)).toHaveLength(6);
    });

    it('should render six FormControl elements', () => {
        expect(wrapper.find(FormControl)).toHaveLength(6);
    });
});