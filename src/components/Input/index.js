import React, {Component} from 'react';
import { connect } from 'react-redux';
import { emitChange } from 'redux/reducer/form/actions';

class InputDom extends Component {
  render() {
    const { name, form, dispatch } = this.props;
    const value = form && form[name] && form[name].value ? form[name].value : '';
    const inputProps = {
      type: 'text',
      value,
      name,
      onChange: () => { dispatch(emitChange(name, this.ref.value)) },
      ref: (ref) => { this.ref = ref; }
    };

    return <input {...inputProps} />;
  }
}

export default class Input extends Component {
  render() {
    const {name} = this.props;

    const inputProps = {
      ...this.props,
    };


    const ConnetedInput = connect(state =>({form: state.form}))(InputDom);

    return <ConnetedInput {...inputProps} />;
  }
}
