// reducers/index.js
import { combineReducers } from 'redux';
import taskReducers from './taskReducers'; // You need to create this file

const rootReducer = combineReducers({
  tasks: taskReducers,
});

export default rootReducer;
