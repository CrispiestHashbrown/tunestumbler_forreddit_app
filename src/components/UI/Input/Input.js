import React from 'react';

import { Form } from 'react-bootstrap';
import classes from './Input.css';

const input = (props) => {
    let inputClasses = [];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <Form.Control
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case('select'):
            inputElement = <select 
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.options.map(option => (
                        <option key={`${props.keyPrefix}${option.key}`} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>;
            break;
        default:
            inputElement = <Form.Control
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
