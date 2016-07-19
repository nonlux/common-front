import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import EventEmitter from 'events';
const dispatcher = new EventEmitter;

class Hello extends Component {
  static propTypes = {
    foo: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  constructor(props) {
    super(props);
    const foo = props.foo ? parseInt(props.foo, 10) : 1;
    this.state = { foo };

    dispatcher.on('add', (value) => {
      this.setState({
        ...this.state,
        foo: value + this.state.foo
      });
    });
  }

  render() {
    const { foo } = this.state;
    return <h2>I am react app with dynamic value: {foo}</h2>;
  }
}

function Button() {
  const handleClick = () => {
    dispatcher.emit('add', 1);
  };
  return <button onClick={handleClick} >Button</button>;
}


const helloTag = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value() {
      const foo = this.dataset.foo ? this.dataset.foo : 1;
      ReactDOM.render(<Hello foo={foo} />, this);
    }
  }
});

const ButtonTag = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value() {
      ReactDOM.render(<Button />, this);
    }
  }
});

document.registerElement('x-hello', { prototype: helloTag });
document.registerElement('x-button', { prototype: ButtonTag });
