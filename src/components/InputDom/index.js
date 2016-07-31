import React, {Component, PropTypes} from 'react';
import { onChangeAction, onKeyDownAction, onBlurAction } from 'redux/reducer/form/actions';

export default class InputDom extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
  }

  render() {
    const { name, form, dispatch, className, id, type } = this.props;
    const { formName } = form;
    const value = form && form[name] && form[name].value ? form[name].value : '';
    const inputProps = {
      type: type ? type : 'text',
      value,
      name,
      id,
      className,
      onChange:() => { dispatch(onChangeAction(name, this.refs.ref.value, formName)) },
      onKeyDown(event) { dispatch(onKeyDownAction(name, event.key, formName)) },
      ref: 'ref'
    };

    return <input {...inputProps} />;
  }
}

