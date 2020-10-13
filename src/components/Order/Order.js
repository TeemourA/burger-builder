import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  console.log(props.ingredients);
  const ingredients = Object.entries(props.ingredients)
    .map(([ingredient, amount], i) =>
      <span
        style={{
          display: 'inline-block',
          textTransform: 'capitalize',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        key={i}>{ingredient} ({amount})</span>
    );

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  );
};

export default order;