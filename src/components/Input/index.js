import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { InputDom, Suggest, Validator } from 'components';


export default class Input extends Component {
  static propTypes = {
    formName: PropTypes.string,
    type: PropTypes.string,
  }
  render() {
    const formName = this.props.formName ? this.props.formName : 'form';
    const type = this.props.type ? this.props.type : 'text';
    const inputProps = {
      ...this.props,
      formName,
    };
    const connectFn = connect(state =>({form: state[formName]}))

    let ConnetedInput = '';
    switch (type) {
      case 'suggest': {
        ConnetedInput = connectFn(Suggest);
        break;
      }
      default: {
        ConnetedInput = connectFn(InputDom);
      }
    }

    const ConnetedValidator = connect(state =>({form: state[formName]}))(Validator);

    return <ConnetedValidator {...inputProps} >
      <ConnetedInput {...inputProps} />
    </ConnetedValidator>
  }
}
