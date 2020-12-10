import actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const basePrice = 4;

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: basePrice,
  building: false,
};

const ingredientPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
};

const addIngredient = (state, action) => {
  const updatedIngredientAdded = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredientsAdded = updateObject(
    state.ingredients,
    updatedIngredientAdded
  );
  const updatedStateAdded = {
    ingredients: updatedIngredientsAdded,
    totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
    building: true,
  };

  return updateObject(state, updatedStateAdded);
};

const removeIngredient = (state, action) => {
  const updatedIngredientRemoved = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsRemoved = updateObject(
    state.ingredients,
    updatedIngredientRemoved
  );
  const updatedStateRemoved = {
    ingredients: updatedIngredientsRemoved,
    totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
    building: true,
  };

  return updateObject(state, updatedStateRemoved);
};

const setIngredients = (state, action) => {
  const currentPrice =
    basePrice +
    Object.entries(action.ingredients).reduce(
      (acc, [ingredient, amount]) =>
        acc + ingredientPrices[ingredient] * amount,
      0
    );
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: currentPrice,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) =>
  updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
