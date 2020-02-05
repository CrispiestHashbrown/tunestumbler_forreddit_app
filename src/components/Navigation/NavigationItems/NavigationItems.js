import React from 'react';

import { Nav } from 'react-bootstrap';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let items = 
        <Auxiliary>
            <NavigationItem link="/login">Login</NavigationItem>
            <NavigationItem link="/signup">Signup</NavigationItem> 
        </Auxiliary>;
    
    if (props.isLoggedIn && !props.isConnected) {
        items = 
            <Auxiliary>
                <NavigationItem link="/connect">Connect</NavigationItem>
                {/* <NavigationItem link="/settings">Settings</NavigationItem> */}
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Auxiliary>;
    }

    if (props.isLoggedIn && props.isConnected) {
        items = 
            <Auxiliary>
                <NavigationItem link="/new">New</NavigationItem>
                <NavigationItem link="/top">Top</NavigationItem>
                <NavigationItem link="/hot">Hot</NavigationItem>
                <NavigationItem link="/best">Best</NavigationItem>
                <NavigationItem link="/filters">Filters</NavigationItem>
                {/* <NavigationItem link="/settings">Settings</NavigationItem> */}
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Auxiliary>;
    }

    return (
        <Nav className={classes.NavigationItems}>    
            {items}
        </Nav>
    );
}

export default navigationItems;