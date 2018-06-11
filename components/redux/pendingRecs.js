import axios from 'axios';
import IP from '../../secrets';

const GET_PENDING_RECS = 'GET_PENDING_RECS';

export const getPendingRecs = pendingRecs => ({type: GET_PENDING_RECS, pendingRecs})

export const fetchPendingRecs = (userId, navigation) => dispatch => {
  axios.get(`${IP}/api/recommendations/pending/users/${userId}`)
  .then(res => res.data)
  .then(pendingRecs => {
    dispatch(getPendingRecs(pendingRecs))
    navigation.navigate('PendingRecs', {pendingRecs})
  })
  .catch(err => console.log(err))
}

export default function reducer (pendingRecs = {}, action) {
  switch (action.type) {

    case GET_PENDING_RECS:
      return action.pendingRecs

    default:
      return pendingRecs;
  }
}
