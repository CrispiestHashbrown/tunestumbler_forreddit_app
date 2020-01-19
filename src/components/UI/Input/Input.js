import React from 'react';

import { Form, InputGroup } from 'react-bootstrap';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Input.css';

const input = (props) => {
    let inputClasses = [];

    let validationElement = null;
    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        validationElement = 
            <div className="invalid-feedback d-block">
                {props.validation.message}
            </div>
    }

    let inputElement = null;
    switch (props.elementType) {
        case('number'):
            inputElement = 
                <InputGroup>
                    <Form.Control
                        key={`input-${props.id}`}
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changed} />
                    <InputGroup.Append>
                        <InputGroup.Text>Upvotes</InputGroup.Text>
                    </InputGroup.Append>
                    {validationElement}
                </InputGroup>;
            break;
        case('select'):
            inputElement = 
                <Auxiliary>
                    <Form.Control as="select"
                        key={`input-${props.id}`}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changed}>
                        {props.options.map(option => (
                            <option key={`${props.keyPrefix}${option.key}`} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </Form.Control>
                    {validationElement}
                </Auxiliary>;
            break;
        default:
            inputElement =
            <Auxiliary>
                <Form.Control
                    key={`input-${props.id}`}
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed} />
                {validationElement}
            </Auxiliary>;
    }

    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
