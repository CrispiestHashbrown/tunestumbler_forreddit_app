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
        <NavigationItem link="/account">Account</NavigationItem>
    </ul>
);

export default navigationItems;