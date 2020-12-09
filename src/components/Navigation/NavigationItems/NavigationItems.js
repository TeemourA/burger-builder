import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact onClick={props.closed}>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders" onClick={props.closed}>Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout" onClick={props.closed}>Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth" onClick={props.closed}>Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
