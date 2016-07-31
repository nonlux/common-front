import TYPES from '../form/types';
import {ReducerRunner} from 'utils/redux';

export default function suggestReducerFactory(name, formName = 'form') {

  const initialState = {
    items: [],
  };
  const runner = new ReducerRunner();
  runner.initialState = initialState;

  runner.add(TYPES.CHANGE, (state, action) => {

    if ( formName !== action.formName  || name !== action.name ) {
      return {};
    }

    const items = ['aa', 'bb', 'cc', 'dd', 'ii', 'ff', 'gg'];

    return {
      items: items.map((item) => `${action.value}${item}`)
    };
  });


  return runner.instance;
}


