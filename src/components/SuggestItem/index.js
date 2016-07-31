import React, {Component, PropTypes} from 'react';

export default class SuggestItem extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    suggest: PropTypes.string.isRequired,
    //dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { value, suggest } = this.props;
    console.log(new RegExp(`^${value}`));
    const text = suggest.split(new RegExp(`^${value}`))[1];
    console.log(text);

    return <li className="suggestItem">
     { typeof text !== undefined && <span className="prefix">{value}</span> }
     { typeof text !== undefined && <span>{text}</span> }
     { typeof text === undefined && <span>{suggest}</span> }
    </li>;
  }
}

