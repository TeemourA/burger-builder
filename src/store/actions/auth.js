import axios from 'axios';
import actionTypes from './actionTypes';

const authResource =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOtlH6w4ERIKikaFfpOJ1kz642YF15Fac';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    console.log(authData);

    dispatch(authStart());
    axios
      .post(authResource, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response));
      });
  };
};
