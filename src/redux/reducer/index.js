import { combineReducers } from 'redux';

import form, {formReducerFactory} from './form';

export default combineReducers({
  form,
  formNext: formReducerFactory('formNext'),
});
