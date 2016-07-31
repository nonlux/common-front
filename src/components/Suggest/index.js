import React, {Component, PropTypes} from 'react';
import {
  InputDom,
  SuggestList,
} from 'components';

import { connect } from 'react-redux';

export default class Suggest extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    formName: PropTypes.string.isRequired,
  }

  render() {
     const { name, formName } = this.props;
     const input  = this.props.form[name];
     const defaults = {
       focused: false,
       value: '',
     };
     const { focused, value, } = { ...defaults, ...input }

     console.log(value, 'value');

     const nextProps = {
       ...this.props,
       type: 'text'
     };
     const ConnectedSuggestList = connect((state) => ({suggest: state.suggest[`${name}${formName}`]}))(SuggestList)
    return <div>
      <InputDom {...nextProps}/>
      { focused && value.length > 0 && <ConnectedSuggestList value={value} /> }
    </div>;
  }
}

