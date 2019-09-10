import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        { props.isLoggedIn 
            ? <Auxiliary>
                <NavigationItem link="/new">New</NavigationItem>
                <NavigationItem link="/top">Top</NavigationItem>
                <NavigationItem link="/hot">Hot</NavigationItem>
                <NavigationItem link="/best">Best</NavigationItem>
                <NavigationItem link="/filters">Filters</NavigationItem>
                <NavigationItem link="/settings">Settings</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Auxiliary>
            : <Auxiliary>
                <NavigationItem link="/login">Log in</NavigationItem>
                <NavigationItem link="/signup">Sign up</NavigationItem> 
            </Auxiliary> }
    </ul>
);

export default navigationItems;