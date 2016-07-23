require('utils/test');
import {ReducerRunner, loadTypeGenerator, loadReducerGenerator} from './redux';

describe('utils/redux ', () => {
  describe('ReducerRunner spec', () => {
    it('should get reducer instance', () => {
      const runner = new ReducerRunner();
      runner.instance.should.be.a('function');
    });
    it('instance should return state be default', () => {
      const runner = new ReducerRunner();
      const reducer = runner.instance;
      const state = { foo: 'bar' };
      reducer().should.be.deep.equal({});
      reducer(state).should.be.deep.equal(state);
    });
    it('should set initialState', () => {
      const runner = new ReducerRunner();
      const state = { foo: 'bar' };
      runner.initialState = state;
      const reducer = runner.instance;
      reducer().should.be.deep.equal(state);
    });
    it('should not override state with ininal', () => {
      const runner = new ReducerRunner();
      const state = { foo: 'bar' };
      runner.initialState = { foo: 'foo'};
      const reducer = runner.instance;
      reducer(state).should.be.deep.equal(state);
    });
    it('should add reducer by type', () => {
      const runner = new ReducerRunner();
      const state = { foo: 'bar' };
      const oldState = { foo: 'foo' };
      runner.add('type', () => { return state;});
      const reducer = runner.instance;
      reducer(oldState, {type:'type'}).should.be.deep.equal(state);
      reducer(oldState, {type:'other'}).should.be.deep.equal(oldState);
    });
    it('should add  multiple reducer by type', () => {
      const runner = new ReducerRunner();
      const state = { foo: 'bar' };
      const nextState = { bar: 'foo'};
      const oldState = { foo: 'foo' };
      runner.add('type', () => { return state;});
      runner.add('type', (state) => { return {...state, ...nextState};});
      const reducer = runner.instance;
      reducer(oldState, {type:'type'}).should.be.deep.equal({...state, ...nextState});
    });
  });
  describe('loadTypeGenerator spec', () => {
    it('should generate loadable types', () => {
      const types = loadTypeGenerator('foo');
      types.PENDING.should.be.equal('foo/LOAD_PENDING');
      types.SUCCESS.should.be.equal('foo/LOAD_SUCCESS');
      types.ERROR.should.be.equal('foo/LOAD_ERROR');
    });
  });
  describe('loadReducerGenerator spec', () => {
    const TYPES = {LOAD: loadTypeGenerator('foo')};
      const runner = new ReducerRunner();
    loadReducerGenerator(runner, TYPES.LOAD);
    const reducer = runner.instance;

  it('initialState desc', () => {
    const state = reducer();
    state.loading.should.be.equal(false);
    state.loaded.should.be.equal(false);
  });
  it(TYPES.LOAD.PENDING + ' spec',() => {
    const state = reducer({},{type: TYPES.LOAD.PENDING});
    state.loading.should.be.equal(true);
  });
  it(TYPES.LOAD.SUCCESS + ' spec',() => {
    const state = reducer({},{type: TYPES.LOAD.SUCCESS});
    state.loading.should.be.equal(false);
    state.loaded.should.be.equal(true);
  });
  it(TYPES.LOAD.ERROR + ' spec',() => {
    const state = reducer({},{type: TYPES.LOAD.ERROR});
    state.loading.should.be.equal(false);
    state.loaded.should.be.equal(false);
  });
    it('should generate loadable reducers', () => {
    });
  });
});
