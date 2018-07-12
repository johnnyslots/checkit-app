import axios from 'axios';
import IP from '../../secrets';

// const user = {
// "createdAt": "2018-06-28T16:18:53.093Z",
// "email": "cody@email.com",
// "firstName": "Cody",
// "fullName": "Cody Smith",
// "googleId": null,
// "id": 1,
// "lastName": "Smith",
// "updatedAt": "2018-06-28T16:18:53.093Z"
// }

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, navigation) => dispatch => {
  axios.put(`${IP}/auth/login`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('SignedOut', {error: 'Login failed.'}));
};

export const signup = (credentials, navigation) => dispatch => {
  axios.post(`${IP}/auth/signup`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('SignedOut', {error: 'Signup failed.'}));
};

export const logout = navigation => dispatch => {
  axios.delete(`${IP}/auth/logout`)
    .then(() => {
      dispatch(removeCurrentUser());
      navigation.navigate('SignedOut', {error: 'Logout successful.'});
    })
    .catch((error) => console.error('Logout successful:  ', error));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (user, navigation, dispatch) {
  dispatch(setCurrentUser(user));
  navigation.navigate('SignedIn');
}
