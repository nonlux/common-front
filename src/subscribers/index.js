import example from './example.js';
import SUGGEST_TYPES from 'redux/reducer/suggest/types';

export default function subscribers(store) {

function subscribe( type, callback) {
  let latest = '';
  store.subscribe(() => {
    const action = store.getState().lastAction
    if (type === action.type && JSON.stringify(action) !== latest ) {
      latest = JSON.stringify(action);
      callback(store.getState(), action, store.dispatch)
    }
  });
}

//subscribe(SUGGEST_TYPES.UPDATE, example);

}
