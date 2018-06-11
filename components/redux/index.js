import { combineReducers } from 'redux';

import currentUser from './auth';
import listByCategory from './listByCategory';
import pendingRecs from './pendingRecs'

export default combineReducers({
  currentUser,
  listByCategory,
  pendingRecs
});
