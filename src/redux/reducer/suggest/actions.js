import TYPES from './types';

export function  onUpdate(value, name, formName = 'form') {
  return {
    type:TYPES.UPDATE,
    payload: value,
    meta: {
      name,
      formName
   }
  }

}

