import React from 'react';

<<<<<<< HEAD
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
=======
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
>>>>>>> 17f4b2ddba4cee8df37a56ed5af46225a4ad3042
