import React from 'react';

import { Navbar } from 'react-bootstrap';
import classes from './Toolbar.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
    <Navbar className={classes.Toolbar}>
        <Navbar.Brand href="/login">
            <img 
                src={require('../../../assets/tunestumblerlogo-40.png')}
                className="d-inline-block align-top"
                alt="Tunestumbler logo" />
        </Navbar.Brand>
        <NavigationItems 
            isLoggedIn={props.isLoggedIn}
            isConnected={props.isConnected} />
    </Navbar>
);

export default toolbar;