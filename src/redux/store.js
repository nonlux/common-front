import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import eventer from './middleware/eventer';
import  DevTools  from '../components/DevTools';


const store = createStore(reducer, compose(
  // Middleware you want to use in development:
  applyMiddleware(eventer),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument( { maxAge: 50, shouldCatchErrors: true })
));

export default store;
