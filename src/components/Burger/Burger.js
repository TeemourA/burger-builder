import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
  let transfromedIngredients = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])]
        .map((_, i) => {
          return <BurgerIngredient key={key + i} type={key} />
        });
    })
    .reduce((acc, item) => {
      return acc.concat(item);
    }, []);
  console.log(transfromedIngredients);

  if (transfromedIngredients.length === 0) {
    transfromedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transfromedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger; 