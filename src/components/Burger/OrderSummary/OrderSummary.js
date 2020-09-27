import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.entries(props.ingredients)
    .map(([ingredient, amount], i) =>
      <li key={i}>
        <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {amount}
      </li>
    );

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger width the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
};

export default orderSummary;