import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creategroup from './creategroup';
import groups from './groups';
export default combineReducers({
  alert,
  auth,
  creategroup,
  groups,
});
