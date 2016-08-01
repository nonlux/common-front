import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { InputDom, Suggest, Validator } from 'components';


export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    formName: PropTypes.string,
    type: PropTypes.string,
  }
  render() {
    const { name } = this.props;
    const formName = this.props.formName ? this.props.formName : 'form';
    const type = this.props.type ? this.props.type : 'text';
    const inputProps = {
      ...this.props,
      formName,
    };
    const map = state =>({form: state[formName]});

    let ConnetedInput = '';
    switch (type) {
      case 'suggest': {
        ConnetedInput = connect((state) => {
          const nextState = map(state);
          return { ...nextState, suggest: state.suggest[`${name}${formName}`] };
        })(Suggest);
        break;
      }
      default: {
        ConnetedInput = connect(map)(InputDom);
      }
    }

    const ConnetedValidator = connect(state =>({form: state[formName]}))(Validator);

    return <ConnetedValidator {...inputProps} >
      <ConnetedInput {...inputProps} />
    </ConnetedValidator>
  }
}
