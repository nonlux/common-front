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

  const {name} = action;
  const next = {};
  next[name] = {
    ...state[name],
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

  const {name, isValid, error} = action;
  const next = {};
  next[name] = {
    ...state[name],
    isValid,
    error: error ? error : '',
  };

  return next;
});

return runner.instance;
}
export default formReducerFactory();
