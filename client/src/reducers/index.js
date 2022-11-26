import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creategroup from './creategroup';
import allgroup from './allgroup';
import groups from './groups';
import joinedgroups from './joinedgroups';
import othergroupjoined from './othergroupjoined';
export default combineReducers({
  alert,
  auth,
  creategroup,
  allgroup,
  groups,
  joinedgroups,
  othergroupjoined,
});
