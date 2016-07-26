import React from 'react';
import ReactDOM from 'react-dom';

import {
  Input,
  Root,
} from 'components';

ReactDOM.render(
    <Root>
      <Input name="foo" />
      <Input name="foo" />
      <Input name="foo" formName='formNext' />
    </Root>, document.getElementById('content'));
