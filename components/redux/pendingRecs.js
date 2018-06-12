import axios from 'axios';
import IP from '../../secrets';

const GET_PENDING_RECS = 'GET_PENDING_RECS';
const ACCEPT_PENDING_REC = 'ACCEPT_PENDING_REC';

export const getPendingRecs = pendingRecs => ({type: GET_PENDING_RECS, pendingRecs})

export const acceptPendingRec = remainingRecs => ({type: ACCEPT_PENDING_REC, remainingRecs})

export const fetchPendingRecs = (userId, navigation) => dispatch => {
  axios.get(`${IP}/api/recommendations/pending/users/${userId}`)
  .then(res => res.data)
  .then(pendingRecs => {
    dispatch(getPendingRecs(pendingRecs))
    navigation.navigate('PendingRecs', {pendingRecs})
  })
  .catch(err => console.log(err))
}

export const updatePendingRec = (recId, allPendingRecs) => dispatch => {
  axios.put(`${IP}/api/recommendations/pending/${recId}`)
  .then(res => res.data)
  .then(acceptedRec => {
    const remainingRecs = allPendingRecs.filter(rec => {
      return rec.id !== acceptedRec.id
    })
    dispatch(acceptPendingRec(remainingRecs))
  })
  .catch(err => console.log(err))
}

export default function reducer (pendingRecs = {}, action) {
  switch (action.type) {

    case GET_PENDING_RECS:
      return action.pendingRecs

    case ACCEPT_PENDING_REC:
      return action.remainingRecs

    default:
      return pendingRecs;
  }
}
