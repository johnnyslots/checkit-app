import axios from 'axios';
import IP from '../../secrets';

const GET_PENDING_FRIENDS = 'GET_PENDING_FRIENDS';
const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';

export const getPendingFriends = pendingFriends => ({type: GET_PENDING_FRIENDS, pendingFriends})

export const acceptFriendRequest = remainingRequests => ({type: ACCEPT_FRIEND_REQUEST, remainingRequests})

export const fetchPendingFriends = (userId, navigation) => dispatch => {
  axios.get(`${IP}/api/friends/pending/users/${userId}`)
  .then(res => res.data)
  .then(pendingFriends => {
    dispatch(getPendingFriends(pendingFriends))
    navigation.navigate('PendingFriends', {pendingFriends})
  })
  .catch(err => console.log(err))
}

export const updateFriendRequest = (requestId, allPendingRequests) => dispatch => {
  axios.put(`${IP}/api/friends/pending/${requestId}`)
  .then(res => res.data)
  .then(friend => {
    console.log('friend!!!!', friend)
    const remainingRequests = allPendingRequests.filter(request => {
      return friend.id !== request.id
    })
    console.log('remainingRequests???', remainingRequests)
    dispatch(acceptFriendRequest(remainingRequests))
  })
  .catch(err => console.log(err))
}

export default function reducer (pendingFriends = [], action) {
  switch (action.type) {

    case GET_PENDING_FRIENDS:
      return action.pendingFriends

    case ACCEPT_FRIEND_REQUEST:
      return action.remainingRequests

    default:
      return pendingFriends;
  }
}
