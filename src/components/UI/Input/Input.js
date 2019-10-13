import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputClasses = [];
    switch (props.elementDisplay) {
        case('block'):
            inputClasses = [classes.BlockInputElement];
            break;
        case('row'):
            inputClasses = [classes.RowInputElement];
            break;
        default:
            inputClasses = [];
    }    

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case('select'):
            inputElement = <select 
                    className={inputClasses.join(' ')}
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
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
