import React, {Component, PropTypes} from 'react';
import {
  InputDom,
  SuggestList,
} from 'components';

import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

const languages = [
  {
    name: 'C',
    year: 1972

  },
  {
    name: 'Elm',
    year: 2012

  },
  {
    name: 'Elc',
    year: 2012

  },
  {
    name: 'Car',
    year: 2012

  },
   
];

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
                                                   lang.name.toLowerCase().slice(0, inputLength) === inputValue
                                                  );

}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells 
  return suggestion.name;                 // what should be the value of the input 
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>

  );

}

export default class Suggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
      onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps} />
    );
  }
}

