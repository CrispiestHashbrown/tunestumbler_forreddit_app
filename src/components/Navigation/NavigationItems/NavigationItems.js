import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/new">New</NavigationItem>
        <NavigationItem link="/top">Top</NavigationItem>
        <NavigationItem link="/hot">Hot</NavigationItem>
        <NavigationItem link="/best">Best</NavigationItem>
        <NavigationItem link="/filters">Filters</NavigationItem>
        {/* TODO: render these conditionally */}
        <NavigationItem link="/settings">Settings</NavigationItem>
        <NavigationItem link="/login">Log in</NavigationItem>
        <NavigationItem link="/signup">Sign up</NavigationItem>
    </ul>
);

export default navigationItems;