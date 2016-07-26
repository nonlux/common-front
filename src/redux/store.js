import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import eventer from './middleware/eventer';

const store = createStore(reducer, applyMiddleware(eventer));

export default store;
