import  defaults from './defaults';

import dev from './dev';

const config = {
  ...process.env,
  ...defaults,
  ...dev,
}

process.env = config;

export default config;
