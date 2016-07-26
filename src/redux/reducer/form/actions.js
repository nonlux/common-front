import TYPES from './types';

export function emitChange(key, value, formName = 'form') {
  return {
    type: TYPES.CHANGE,
    key,
    value,
    formName,
  };
}
