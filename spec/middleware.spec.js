import { expect, should } from 'chai';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { reduxReqMiddleware } from '../src/middleware';

const lastAction = (state = { action: true }, action) => (
  Object.assign({}, state, { action: action.type })
);
  
const rootReducer = combineReducers({
  lastAction
});

describe('middleware', () => {
  it('Should dispatch a request and return a success action', (done) => {
    
    const middleware = applyMiddleware(
      reduxReqMiddleware({
        request: '_REQUEST',
        success: '_SUCCESS',
        error: '_ERROR'
      }));

    const store = createStore(rootReducer, {}, middleware);
    const result = store.dispatch({
      type: 'DATA_REQUEST',
      request: new Promise((resolve) => resolve({ id: 22 }))
    });

    const expectedResult = {
      type: 'DATA_SUCCESS',
      payload: { id: 22 }
    };
    
    expect(store.getState().lastAction.action).to.equal('DATA_REQUEST');

    result
      .then(action => {
        expect(action).to.deep.equal(expectedResult);
        done();
      });

  });

  it('Should dispatch a request and return a error action', (done) => {
    
    const middleware = applyMiddleware(
      reduxReqMiddleware({
        request: '_REQUEST',
        success: '_SUCCESS',
        error: '_ERROR'
      }));

    const store = createStore(rootReducer, {}, middleware);
    const result = store.dispatch({
      type: 'DATA_REQUEST',
      request: new Promise((resolve, reject) => reject({ err: true }))
    });

    const expectedResult = {
      type: 'DATA_ERROR',
      payload: { err: true }
    };

    expect(store.getState().lastAction.action).to.equal('DATA_REQUEST');

    result.then(action => {
      expect(action).to.deep.equal(expectedResult);
      done();
    });

  });

  it('Should dispatch a request and return a success action without config', (done) => {    
    
    const middleware = applyMiddleware(reduxReqMiddleware());
    const store = createStore(rootReducer, {}, middleware);
    
    const result = store.dispatch({
      type: 'DATA',
      request: new Promise((resolve) => resolve({ id: 22 }))
    });

    const expectedResult = {
      type: 'DATA_SUCCESS',
      payload: { id: 22 }
    };

    expect(store.getState().lastAction.action).to.equal('DATA');

    result.then(action => {
      expect(action).to.deep.equal(expectedResult);
      done();
    });
  });


  it('Should return an error action without config', (done) => {    
    
    const middleware = applyMiddleware(reduxReqMiddleware());
    const store = createStore(rootReducer, {}, middleware);

    const result = store.dispatch({
      type: 'DATA',
      request: new Promise((resolve, reject) => reject({ err: true }))
    });

    const expectedResult = {
      type: 'DATA_ERROR',
      payload: { err: true }
    };

    expect(store.getState().lastAction.action).to.equal('DATA');

    result.then(action => {
      expect(action.type).to.equal('DATA_ERROR');
      done();
    });
  });

  it('Should merge partial config', (done) => {    
    
    const middleware = applyMiddleware(reduxReqMiddleware({ success: '_OK' }));
    const store = createStore(rootReducer, {}, middleware);

    const result = store.dispatch({
      type: 'LECHES',
      request: new Promise((resolve) => resolve({ id: 44 }))
    });

    const expectedResult = {
      type: 'LECHES_OK',
      payload: { id: 44 }
    };

    expect(store.getState().lastAction.action).to.equal('LECHES');

    result.then(action => {
      expect(action).to.deep.equal(expectedResult);
      done();
    });
  });

  it('Should thrown an exception if request is not a promise', (done) => {
    
    const middleware = applyMiddleware(
      reduxReqMiddleware({
        request: '_REQUEST',
        success: '_SUCCESS',
        error: '_ERROR'
      }));

    const store = createStore(() => ({}), middleware);
    
    try {
      store.dispatch({
        type: 'DATA_REQUEST',
        request: 22 
      });
    } catch (err) {
      // fixme
      expect(true).to.equal(true);
      done();
    }
  });

});