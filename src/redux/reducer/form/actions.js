import TYPES from './types';

export function onChangeAction(name, value, formName = 'form') {
  return {
    type: TYPES.CHANGE,
    name,
    value,
    formName,
  };
}

export function onKeyDownAction(name, key, formName = 'form') {
  const ret =  {
    type: TYPES.KEYDOWN,
    key,
    name,
    formName,
  }

  const pressTypes = {
    ArrowUp:TYPES.PRESS.ARROW_UP,
    ArrowDown: TYPES.PRESS.ARROW_DOWN,
    Enter: TYPES.PRESS.ENTER,
    Escape: TYPES.PRESS.ESCAPE
  }

  if (pressTypes[key]){
    ret.type = pressTypes[key];
  }

  return ret;
}

export function onBlurAction(name, formName = 'form') {
  return {
    type: TYPES.BLUR,
    name,
    formName
  }
}
