const desc = describe;

describe = (name, callback) => { //eslint-disable-line no-native-reassign
  desc(name, () => {
    const oldError = console.error;
    beforeEach(() => {
      const errorLogger = (message) => {
        oldError.apply(console, arguments); //eslint-disable-line prefer-rest-params
        throw new message; //eslint-disable-line new-cap
      };
      console.error = errorLogger;
    });
    afterEach(() => {
      console.error = oldError;
    });
    callback.apply(this, arguments); //eslint-disable-line prefer-rest-params
  });
};

const context = require.context('./src', true, /-(test|spec)\.js$/);
context.keys().forEach(context);
