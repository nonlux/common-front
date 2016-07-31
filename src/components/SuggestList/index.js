import React, {Component, PropTypes} from 'react';

import {
  SuggestItem,
} from 'components';

export default class SuggestList extends Component {
  static propTypes = {
    //dispatch: PropTypes.func.isRequired,
    suggest: PropTypes.object.isRequired,
//    value: PropTypes.string.isRequired,
  }

  render() {
    const { suggest: { items }, value, } = this.props;
    let key=0;
    return <ul>
      {items.map((item) => {key++; return <SuggestItem key={key} suggest={item} value={value}/>})}
    </ul>
  }
}

