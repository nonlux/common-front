import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

export default class Validator extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    return this.props.children;
  }

  componetWillUpdate() {
    const { name, form, dispatch } = this.props;
    dispatch({
      type: 'form/VALIDATE',
      name,
      formName: form.formName,
      isValid: false,
      error: 'some erro',
    });
  }
}

