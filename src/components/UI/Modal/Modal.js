import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = React.memo((props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}>
      {props.children}
    </div>
  </Aux>
), (prevProps, nextProps) => {
  if (prevProps.show !== nextProps.show) return false;

  return true;
});

export default modal;