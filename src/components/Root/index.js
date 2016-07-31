import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from 'redux/store';
import { DevTools } from  'components';

export default class Root extends Component {
  render() {
    const { children } = this.props;
    return <Provider store={ store } >
      <div>
        { children }
        <DevTools />
      </div>
    </Provider>
  }
}
