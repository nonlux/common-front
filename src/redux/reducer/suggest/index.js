import FORM_TYPES from '../form/types';
import TYPES from './types';
import {ReducerRunner, loadReducerGenerator} from 'utils/redux';

export default function suggestReducerFactory(name, formName = 'form') {

  const initialState = {
    items: [],
  };
  const runner = new ReducerRunner();
  runner.initialState = initialState;

  /*simple suggest example
  */

  runner.add(TYPES.SUCCESS, (state, action) => {
    if ( formName !== action.meta.formName  || name !== action.meta.name ) {
      return {};
    }

    return {
      items: action.payload
    };
  });
  runner.setLoadable(TYPES);


  return runner.instance;
}


