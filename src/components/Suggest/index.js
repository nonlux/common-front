import React, {Component, PropTypes} from 'react';
import {
  InputDom,
  SuggestList,
} from 'components';

import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {
  onChangeAction,
} from 'redux/reducer/form/actions';

import classNames from 'classnames';

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

export default class Suggest extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    suggest: PropTypes.object.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
  }

  render() {
    const { name, form, dispatch, className, id, type, suggest: { items } } = this.props;
    const { formName } = form;
    const value = form && form[name] && form[name].value ? form[name].value : '';
    const inputProps = {
      value,
      name,
      className: classNames(className, 'react-autosuggest__input'),
      onChange:(event, { newValue }) => { dispatch(onChangeAction(name, newValue, formName)) },
    };
    return (
      <Autosuggest suggestions={items}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps} />
    );
  }
}

