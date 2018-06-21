import { combineReducers } from 'redux';

import currentUser from './auth';
import listByCategory from './listByCategory';
import pendingRecs from './pendingRecs';
import openRequests from './openRequests';
import pendingFriends from './pendingFriends';
import users from './searchUsers';

export default combineReducers({
  currentUser,
  listByCategory,
  pendingRecs,
  openRequests,
  pendingFriends,
  users
});
