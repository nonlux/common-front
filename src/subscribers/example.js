import TYPES from 'redux/reducer/suggest/types';

async function example(state, action, dispatch) {
  const {formName, name} = action.meta;
  if (formName !== 'formNext' && name !=='foo' ) {
    return;
  }

  try {
    dispatch({
      type: TYPES.PENDING,
      meta: {
        formName,
        name,
      }
    });
    const gists = await fetch([
      'http://ahunter.ru/site/suggest/person?output=json|pretty;query=',
      encodeURIComponent(state[formName][name].value)].join(''));
    const result =  await gists.json();
    console.log(result);
    dispatch({
      type: TYPES.SUCCESS,
      payload: result.suggestions.map((item) => item.value),
      meta: {
        formName,
        name,
      }
    });
  }
  catch (error) {
    dispatch({
      type: TYPES.ERROR,
      error,
      meta: {
        formName,
        name,
      }
    });

  }
}


export default example;
