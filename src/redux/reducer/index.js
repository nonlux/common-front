import { combineReducers } from 'redux';

import form, {formReducerFactory} from './form';
import suggest from './suggest';

export default combineReducers({
  form,
  formNext: formReducerFactory('formNext'),
  suggest: combineReducers({
    fooformNext: suggest('foo', 'formNext'),
  }),
  lastAction: (state, action) => ({ ...action, time: new Date().getTime() })
});
