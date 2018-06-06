import axios from 'axios';
import IP from '../../secrets';

const GET_LIST_BY_CATEGORY = 'GET_LIST_BY_CATEGORY';

export const getListByCategory = listByCategory => ({type: GET_LIST_BY_CATEGORY, listByCategory})

export const fetchListByCategory = (category, userId, navigation) => dispatch => {
  axios.get(`${IP}/api/recommendations/${category}/users/${userId}`)
  .then(res => res.data)
  .then(listByCategory => {
    dispatch(getListByCategory(listByCategory))
    category = category.charAt(0).toUpperCase() + category.split(',').join(' ').slice(1)
    navigation.navigate('ListByCategory', {category})
  })
  .catch(err => console.log(err))
}

export default function reducer (listByCategory = {}, action) {
  switch (action.type) {

    case GET_LIST_BY_CATEGORY:
      return action.listByCategory

    default:
      return listByCategory;
  }
}
