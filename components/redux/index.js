import { combineReducers } from 'redux';

import currentUser from './auth';
import listByCategory from './listByCategory';
import pendingRecs from './pendingRecs';
import openRequests from './openRequests';

export default combineReducers({
  currentUser,
  listByCategory,
  pendingRecs,
  openRequests
});
