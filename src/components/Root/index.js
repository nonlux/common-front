import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from 'redux/store';

export default class Root extends Component {
  render() {
    const { children } = this.props;
    return <Provider store={ store } >
      { children }
    </Provider>
  }
}
