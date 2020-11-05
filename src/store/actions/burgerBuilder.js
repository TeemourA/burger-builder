import actionType from './actionTypes';
import axios from '../../axios-orders';
import actionTypes from './actionTypes';

export const addIngredient = (name) => ({
  type: actionType.ADD_INGREDIENT,
  ingredientName: name,
});

export const removeIngredient = (name) => ({
  type: actionType.REMOVE_INGREDIENT,
  ingredientName: name,
});

export const setIngredients = (ingredients) => ({
  type: actionType.SET_INGREDIENTS,
  ingredients: ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
})

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => dispatch(setIngredients(res.data)))
      .catch(err => dispatch(fetchIngredientsFailed()));
  };
};
