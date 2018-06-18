import axios from 'axios';
import IP from '../../secrets';

const GET_OPEN_REQUESTS = 'GET_OPEN_REQUESTS';

export const getOpenrequests = openRequests => ({type: GET_OPEN_REQUESTS, openRequests})

export const fetchOpenRequests = (userId, navigation) => dispatch => {
  axios.get(`${IP}/api/requests/users/${userId}`)
  .then(res => res.data)
  .then(openRequests => {
    dispatch(getOpenrequests(openRequests))
    navigation.navigate('OpenRequests')
  })
  .catch(err => console.log(err))
}

export default function reducer(openRequests = {}, action) {
  switch(action.type) {

    case GET_OPEN_REQUESTS:
      return action.openRequests

    default:
      return openRequests;
  }
}
