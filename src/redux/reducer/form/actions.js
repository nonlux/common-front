import TYPES from './types';

export function emitChange(key, value) {
  return {
    type: TYPES.CHANGE,
    key,
    value,
  };
}
