import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <BrowserRouter>
            <NavLink 
                to={props.link}
                activeClassName={classes.active}>{props.children}</NavLink>
        </BrowserRouter>
    </li>
);

export default navigationItem;