import { expect, should } from 'chai';
import { createStore, compose, applyMiddleware } from 'redux';

import reduxReqMiddleware from '../src/middleware';


describe('middleware', () => {
  it('Should return a success action with resolved promise in the payload', (done) => {
    
    const middleware = applyMiddleware(
      reduxReqMiddleware({
        request: '_REQUEST',
        success: '_SUCCESS',
        error: '_ERROR'
      }));

    const store = createStore(() => ({}), middleware);

    const result = store.dispatch({
      type: 'DATA_REQUEST',
      request: new Promise((resolve) => resolve({ id: 22 }))
    });

    const expectedResult = {
      type: 'DATA_SUCCESS',
      payload: { id: 22 }
    };

    result
      .then(action => {
        expect(action).to.deep.equal(expectedResult);
        done();
      });

  });

  it('Should return a error action with error data in payload', (done) => {
    
    const middleware = applyMiddleware(
      reduxReqMiddleware({
        request: '_REQUEST',
        success: '_SUCCESS',
        error: '_ERROR'
      }));

    const store = createStore(() => ({}), middleware);

    const result = store.dispatch({
      type: 'DATA_REQUEST',
      request: new Promise((resolve, reject) => reject({ err: true }))
    });

    const expectedResult = {
      type: 'DATA_ERROR',
      payload: { err: true }
    };

    result.then(action => {
      expect(action).to.deep.equal(expectedResult);
      done();
    });

  });

  it('Should return a success action without config', (done) => {    
    
    const middleware = applyMiddleware(reduxReqMiddleware());
    const store = createStore(() => ({}), middleware);

    const result = store.dispatch({
      type: 'DATA',
      request: new Promise((resolve) => resolve({ id: 22 }))
    });

    const expectedResult = {
      type: 'DATA_SUCCESS',
      payload: { id: 22 }
    };

    result.then(action => {
      expect(action.type).to.equal('DATA_SUCCESS');
      expect(action).to.deep.equal(expectedResult);
      done();
    });
  });


  it('Should return an error action without config', (done) => {    
    
    const middleware = applyMiddleware(reduxReqMiddleware());
    const store = createStore(() => ({}), middleware);

    const result = store.dispatch({
      type: 'DATA',
      request: new Promise((resolve, reject) => reject({ err: true }))
    });

    const expectedResult = {
      type: 'DATA_ERROR',
      payload: { err: true }
    };

    result.then(action => {
      expect(action.type).to.equal('DATA_ERROR');
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