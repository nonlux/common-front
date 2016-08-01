import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import eventer from './middleware/eventer';
import  DevTools  from '../components/DevTools';


const store = createStore(reducer, compose(
  applyMiddleware(eventer),
  DevTools.instrument( { maxAge: 50, shouldCatchErrors: true })
));

import subscribers from 'subscribers';
subscribers(store);

export default store;
