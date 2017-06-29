import { resolveAction } from './resolveAction';
import { defaultConfig } from './defaultConfig';
import { RequestParamError } from './errors';

const reduxReqMiddleware = (config) => {

  const options = config || defaultConfig;
  
  const middleware = store => next => action => {
    
    const dispatch = store.dispatch;
    const { request, type, ...rest } = action;
    
    if (!request) return next(action);
    else if (!request.then) throw new RequestParamError(action.type);

    next({ type, ...rest });

    return request.then(
      (res) => (dispatch(resolveAction(action, res, options, true))),
      (err) => (dispatch(resolveAction(action, err, options, false)))
    );
  };
  
  return middleware;

};

export default reduxReqMiddleware;