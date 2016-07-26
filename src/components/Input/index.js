import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { InputDom, Validator } from 'components';


export default class Input extends Component {
  static propTypes = {
    formName: PropTypes.string,
  }
  render() {
    const formName = this.props.formName ? this.props.formName : 'form';
    const inputProps = {
      ...this.props,
      formName,
    };

    const ConnetedInput = connect(state =>({form: state[formName]}))(InputDom);
    const ConnetedValidator = connect(state =>({form: state[formName]}))(Validator);

    return <ConnetedValidator {...inputProps} >
      <ConnetedInput {...inputProps} />
    </ConnetedValidator>
  }
}
