import axios from 'axios';
import actionTypes from './actionTypes';

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

export const auth = (email, password, isSignup) => {
  return dispatch => {
    const actionUrl = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOtlH6w4ERIKikaFfpOJ1kz642YF15Fac' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOtlH6w4ERIKikaFfpOJ1kz642YF15Fac';

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    console.log(authData);

    dispatch(authStart());
    axios
      .post(actionUrl, authData)
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
