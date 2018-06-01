import axios from 'axios';
import IP from '../../secrets';

const GET_LIST_BY_CATEGORY = 'GET_LIST_BY_CATEGORY';

export const getListByCategory = list => ({type: GET_LIST_BY_CATEGORY, list})

export const fetchListByCategory = (category, navigation) => dispatch => {
  axios.get(`${IP}/api/recommendations/${category}/users/${userId}`)
  .then(res => res.data)
  .then(list => {
    dispatch(getListByCategory(list))
    console.log('list data!!!', list)
    navigation.navigate('List')
  })
  .catch(err => console.log(err))
}

export default function reducer (list = {}, action) {
  switch (action.type) {

    case GET_LIST_BY_CATEGORY:
      return action.list

    default:
      return category;
  }
}
