import React from 'react';
import { NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <Nav.Item className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            activeClassName={classes.active}>{props.children}</NavLink>
    </Nav.Item>
);

export default navigationItem;