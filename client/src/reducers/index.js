import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creategroup from './creategroup';
import allgroup from './allgroup';
import groups from './groups';
export default combineReducers({
  alert,
  auth,
  creategroup,
  allgroup,
  groups,
});
