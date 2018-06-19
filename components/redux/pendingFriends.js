import axios from 'axios';
import IP from '../../secrets';

const GET_PENDING_FRIENDS = 'GET_PENDING_FRIENDS';

export const getPendingFriends = pendingFriends => ({type: GET_PENDING_FRIENDS, pendingFriends})

export const fetchPendingFriends = (userId, navigation) => dispatch => {
  axios.get(`${IP}/api/friends/pending/users/${userId}`)
  .then(res => res.data)
  .then(pendingFriends => {
    dispatch(getPendingFriends(pendingFriends))
    navigation.navigate('PendingFriends', {pendingFriends})
  })
  .catch(err => console.log(err))
}

export default function reducer (pendingFriends = [], action) {
  switch (action.type) {

    case GET_PENDING_FRIENDS:
      return action.pendingFriends

    default:
      return pendingFriends;
  }
}
