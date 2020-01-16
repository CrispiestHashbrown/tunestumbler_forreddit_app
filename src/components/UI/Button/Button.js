import React from 'react';

import { Button } from 'react-bootstrap';
import classes from './Button.css';

const button = (props) => (
    <Button
        disabled={props.disabled}
        className={[
            classes.Button, 
            classes[props.buttonType], 
            props.className, 
            props.classes].join(' ')}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;
