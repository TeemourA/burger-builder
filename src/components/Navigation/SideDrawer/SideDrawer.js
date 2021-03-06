import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
 
  if (props.open) attachedClasses = [classes.SideDrawer, classes.Open].join(' ');  

  return (
    <Aux>
      <Backdrop
        show={props.open}
        clicked={props.closed} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <div onClick={props.closed}>CLOSE</div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} closed={props.closed}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;