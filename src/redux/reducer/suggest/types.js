import { loadTypeGenerator } from 'utils/redux';

const TYPES = {
  ...loadTypeGenerator('suggest'),
  UPDATE: 'suggest/UPDATE'
};

export default TYPES;
