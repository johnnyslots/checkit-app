import axios from 'axios';
import IP from '../../secrets';

const GET_USERS = 'GET_USERS';

export const getUsers = users => ({type: GET_USERS, users})

export const fetchUsers = (input, currentUserId) => dispatch => {
  if(input) {
    axios.get(`${IP}/api/users/${currentUserId}/search/${input}`)
    .then(res => res.data)
    .then(users => {
      if(users) {
        dispatch(getUsers(users))
      }
      else {
        let noUsers = []
        dispatch(getUsers(noUsers))
      }
    })
    .catch(err => console.log(err))
  }
  else {
    let noUsers = []
    dispatch(getUsers(noUsers))
  }
}

export default function reducer(users = [], action) {
  switch(action.type) {

    case GET_USERS:
      return action.users

    default:
      return users;
  }
}
