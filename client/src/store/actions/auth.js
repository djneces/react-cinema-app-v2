import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_INIT,
  AUTH_LOGOUT,
  AUTH_CHANGE,
} from './actionTypes';

//start authorization
export const authStart = () => ({
  type: AUTH_START,
});

//authorization fail
export const authFail = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

//init gapi
export const authInit = () => async (dispatch) => {
  const auth = new Promise((resolve, reject) => {
    if (!window.gapi) {
      console.error('Network connection error');
      Error('Network connection error');
      return;
    }
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '66661257828-in3qelu6ao563149jr29qpjvr381imk8.apps.googleusercontent.com',
          scope: 'email',

          //init returns a promise (gapi.auth2.GoogleAuth) once it's successfully initialized
        })
        .then(() => {
          const googleAuth = window.gapi.auth2.getAuthInstance();
          resolve(googleAuth);
          dispatch({ type: AUTH_INIT, payload: googleAuth.isSignedIn.get() });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  });

  return await auth;
};

export const onAuthChange = (googleAuth) => async (dispatch) => {
  let email, id, givenName;
  const authStatus = await googleAuth.isSignedIn.get();
  if (authStatus) {
    email = await googleAuth.currentUser.get().getBasicProfile().getEmail();
    id = await googleAuth.currentUser.get().getId();
    givenName = await googleAuth.currentUser
      .get()
      .getBasicProfile()
      .getGivenName();
  }

  dispatch({
    type: AUTH_CHANGE,
    payload: { authStatus, email, id, givenName },
  });
};

export const googleSignIn = (googleAuth) => async (dispatch) => {
  try {
    dispatch(authStart());
    await googleAuth.signIn({
      //prompt popup shows every login
      prompt: 'select_account',
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: googleAuth.currentUser.get().getId(),
    });
  } catch (error) {
    console.error(error);
    dispatch(authFail(error));
  }
};

export const googleSignOut = (googleAuth) => async (dispatch) => {
  try {
    await googleAuth.signOut();
    dispatch({
      type: AUTH_LOGOUT,
    });
  } catch (error) {
    console.error(error);
    dispatch(authFail(error));
  }
};
