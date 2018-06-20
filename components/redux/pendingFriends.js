import axios from 'axios';
import IP from '../../secrets';

const GET_PENDING_FRIENDS = 'GET_PENDING_FRIENDS';
const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
const DISMISS_FRIEND_REQUEST = 'DISMISS_FRIEND_REQUEST';

export const getPendingFriends = pendingFriends => ({type: GET_PENDING_FRIENDS, pendingFriends})

export const acceptFriendRequest = remainingRequests => ({type: ACCEPT_FRIEND_REQUEST, remainingRequests})

export const dismissFriendRequest = remainingRequests => ({type: DISMISS_FRIEND_REQUEST, remainingRequests})

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
  axios.put(`${IP}/api/friends/pending/${requestId}/accept`)
  .then(res => res.data)
  .then(friend => {
    const remainingRequests = allPendingRequests.filter(request => {
      return friend.id !== request.id
    })
    dispatch(acceptFriendRequest(remainingRequests))
  })
  .catch(err => console.log(err))
}

export const dismissRequest = (requestId, allPendingRequests) => dispatch => {
  axios.put(`${IP}/api/friends/pending/${requestId}/dismiss`)
  .then(res => res.data)
  .then(user => {
    const remainingRequests = allPendingRequests.filter(request => {
      return user.id !== request.id
    })
    dispatch(dismissFriendRequest(remainingRequests))
  })
  .catch(err => console.log(err))
}

export default function reducer (pendingFriends = [], action) {
  switch (action.type) {

    case GET_PENDING_FRIENDS:
      return action.pendingFriends

    case ACCEPT_FRIEND_REQUEST:
      return action.remainingRequests

    case DISMISS_FRIEND_REQUEST:
      return action.remainingRequests

    default:
      return pendingFriends;
  }
}
