import TYPES from './types';
import {ReducerRunner} from 'utils/redux';

export const initialState = {
};

const runner = new ReducerRunner();
runner.initialState = initialState;

runner.add(TYPES.CHANGE, (state, action) => {
  const {key} = action;
  const next = {};
  next[key] = {
    value: action.value,
  };

  return next;
});

export default runner.instance;
