import { expect } from 'chai';
import { resolveAction } from '../src/resolveAction';

describe('ResolveAction', () => {
  it('should return a success action', () => {

    const res = { id: 1 };
    const nextState = 'DATA_SUCCESS';
    const action = { type: 'DATA_REQUEST' };
    const options = {
      request: '_REQUEST',
      success: '_SUCCESS',
      error: '_ERROR',
    };
    
    const result = resolveAction(action, res, options, true); 

    const expectedResult = {
      type: nextState,
      payload: res
    };
    
    expect(result).to.deep.equal(expectedResult);
  
});

  it('should return a error action', () => {

    const res = { id: 1 };
    const nextState = 'DATA_ERROR';
    const action = { type: 'DATA_REQUEST' };
    const options = {
      request: '_REQUEST',
      success: '_SUCCESS',
      error: '_ERROR',
    };
    
    const result = resolveAction(action, res, options, false); 

    const expectedResult = {
      type: nextState,
      payload: res
    };
    expect(result).to.deep.equal(expectedResult);
  });
});
