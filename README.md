redux-req-middleware
====================

`redux-req-middleware` is a Redux store middleware for fetching data using HTTP action request and chain actions.

## Installation

You can install `redux-req-middleware` via npm. If you'll use it in a Isomorphic/Universal App i recommend installing the library as production dependency.

```
$ npm install redux-req-middleware --save
```

## Usage

In this example we define the typicall Api call using fetch:

#### api.js

```javascript
export default {
  //Your api calls
  fetchUsers(url) {
    return fetch(url)
      .then(req => req.json())
      .catch(err => err) 
  }
}
``` 
Then, in your Redux action creators you can add your Api call function usign the request param of the action:

```javascript
import api from '../api';

export function getPosts(params) {
  return {
    type: 'USERS_REQUEST',
    request: api.fetchUsers(params)
  };
}
```
`redux-req-middleware` will resolve the request function and will dispatch a new action with a '_SUCCESS' suffix if the request was successful or '_ERROR' suffix if it was unsuccessful. Both the sucess and the error data returned will be added to the payload of the new action dispatched.

Then, in your reducer you can catch the action "USERS_SUCCESS", return a new state and continue with the regular Redux flow or you can get the returned promise with the resolved action returned by the middleware:

```javascript

  store.dispatch(actions.getPosts(numPosts))
  .then(action => {
    //Resolved action of type 'USERS_SUCCESS'
    //and the response in the payload
  })
```


## Configuration

By default, redux-req-middleware uses the following suffixes for the three typicall HTTP states:

`
{
  request: '_REQUEST',
  success: '_SUCCESS',
  error: '_ERROR'
}
`

So if you your action type is "FOO" or "FOO_REQUEST" redux-req-middleware will dispatch a "FOO_SUCCESS" or "FOO_ERROR" action type.

You can use your own suffixes using an object configuration with the same object params described before.  To use `redux-req-middleware` you need to include it as a Redux Store Middleware using default suffixes configuration or custom suffixes configuration:

#### ConfigureStore.js

```js
import reduxReqMiddleware from 'redux-req-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';

//default configuration
const ReduxReqMiddlware = reduxReqMiddleware();

//custom configuration
const ReduxReqMiddlware = reduxReqMiddleware({
  request: '_CALL',
  success: '_OK',
  error: '_KO'
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(reduxReqMiddleware())
  )
)

``` 


## License

MIT

## Projects using redux-req-middleware

- [react-base](https://github.com/atSistemas/react-base/ (atSistemas React/Redux Isomorphic Platform)
