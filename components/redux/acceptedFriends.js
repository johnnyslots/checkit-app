import axios from 'axios';
import IP from '../../secrets';

const GET_FILTERED_ACCEPTED_FRIENDS = 'GET_FILTERED_ACCEPTED_FRIENDS';
const GET_ALL_ACCEPTED_FRIENDS = 'GET_ALL_ACCEPTED_FRIENDS';

export const getFilteredAcceptedFriends = friends => ({type: GET_FILTERED_ACCEPTED_FRIENDS, friends})

export const getAllAcceptedFriends = friends => ({type: GET_ALL_ACCEPTED_FRIENDS, friends})

export const fetchFilteredFriends = (input, currentUserId) => dispatch => {
  if(input) {
    axios.get(`${IP}/api/friends/${currentUserId}/search/${input}`)
    .then(res => res.data)
    .then(friends => {
      if(friends) {
        dispatch(getFilteredAcceptedFriends(friends))
      }
      else {
        let noFriends = []
        dispatch(getFilteredAcceptedFriends(noFriends))
      }
    })
    .catch(err => console.log(err))
  }
  else {
    let noFriends = []
    dispatch(getFilteredAcceptedFriends(noFriends))
  }
}

export const fetchAllFriends = (currentUserId) => dispatch => {
  axios.get(`${IP}/api/friends/${currentUserId}`)
  .then(res => res.data)
  .then(friends => {
    dispatch(getAllAcceptedFriends(friends))
  })
  .catch(err => console.log(err))
}

export default function reducer(friends = [], action) {
  switch(action.type) {

    case GET_FILTERED_ACCEPTED_FRIENDS:
      return action.friends

    case GET_ALL_ACCEPTED_FRIENDS:
      return action.friends

    default:
      return friends;
  }
}
