import EventEmmiter from 'events';

export const sideEventDispather = new EventEmmiter();


/*
sideEventDispather.on('form/CHANGE', ({store, action}) => {
    const {dispatch} = store;
    dispatch({
      type: 'form/VALIDATE',
      key: action.key,
      formName: action.formName,
      isValid: false,
      error: 'some erro',
    });
})
*/
export default function eventer (store) {
  return next =>  action => {
    setTimeout(()=> {sideEventDispather.emit(action.type, {
      store,
      action,
    });},1);
    return next(action);
  }
}

