import { combineReducers } from 'redux';

import currentUser from './auth';
import listByCategory from './listByCategory'

export default combineReducers({
  currentUser,
  listByCategory
});
