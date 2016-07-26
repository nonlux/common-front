import TYPES from './types';
import {ReducerRunner} from 'utils/redux';



export function formReducerFactory(formName = 'form') {

const initialState = {
  formName,
};

const runner = new ReducerRunner();
runner.initialState = initialState;

runner.add(TYPES.CHANGE, (state, action) => {
  if ( state.formName !== action.formName ) {
    return {};
  }

  const {key} = action;
  const next = {};
  next[key] = {
    ...state[key],
    value: action.value,
    isValid: true,
    error: '',
  };

  return next;
});

runner.add(TYPES.VALIDATE, (state, action) => {
  if ( state.formName !== action.formName ) {
    return {};
  }

  const {key, isValid, error} = action;
  const next = {};
  next[key] = {
    ...state[key],
    isValid,
    error: error ? error : '',
  };

  return next;
});

return runner.instance;
}
export default formReducerFactory();
