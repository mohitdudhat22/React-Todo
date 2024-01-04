// store.js
import { createStore } from 'redux';
import rootReducer from '../reducers'; // You need to create this file

const store = createStore(rootReducer);

export default store;
