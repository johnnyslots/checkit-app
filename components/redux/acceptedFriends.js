import axios from 'axios';
import IP from '../../secrets';

const GET_ACCEPTED_FRIENDS = 'GET_ACCEPTED_FRIENDS';

export const getAcceptedFriends = friends => ({type: GET_ACCEPTED_FRIENDS, friends})

export const fetchFriends = (input, currentUserId) => dispatch => {
  if(input) {
    axios.get(`${IP}/api/friends/${currentUserId}/search/${input}`)
    .then(res => res.data)
    .then(friends => {
      if(friends) {
        dispatch(getAcceptedFriends(friends))
      }
      else {
        let noFriends = []
        dispatch(getAcceptedFriends(noFriends))
      }
    })
    .catch(err => console.log(err))
  }
  else {
    let noFriends = []
    dispatch(getAcceptedFriends(noFriends))
  }
}

export default function reducer(friends = [], action) {
  switch(action.type) {

    case GET_ACCEPTED_FRIENDS:
      return action.friends

    default:
      return friends;
  }
}
