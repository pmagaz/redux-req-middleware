# redux-req-middleware

![Build-Status](https://travis-ci.org/pmagaz/redux-req-middleware.svg?branch=master)
[![Build status](https://ci.appveyor.com/api/projects/status/wane4ixtguv7qpaa?svg=true)](https://ci.appveyor.com/project/pmagaz/redux-req-middleware)
[![Coverage Status](https://coveralls.io/repos/github/pmagaz/redux-req-middleware/badge.svg?branch=master)](https://coveralls.io/github/pmagaz/redux-req-middleware?branch=master)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

`redux-req-middleware` is a Redux store middleware for fetching data using HTTP action request.

1. [Installation](#installation)
2. [Usage](#usage)
3. [Configuration](#configuration)

## Installation

You can install `redux-req-middleware` via npm. If you'll use it in a Isomorphic/Universal App i recommend you installing it as production dependency.

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

export function getUserList(params) {
  return {
    type: 'USERS_REQUEST',
    request: api.fetchUsers(params)
  };
}
```
Request Actions handled by redux-req-middleware will dispatch a new action with a '_SUCCESS' suffix if the request was successful or '_ERROR' suffix if it was unsuccessful. Both the sucess and the error data returned will be added to the payload of the new action dispatched.

Then, in your reducer you can catch the action "USERS_SUCCESS", return the regular Redux flow

```javascript

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'USERS_SUCCESS':
      return { ...state, numUsers: action.numUsers };
  }
    ...
}
```


redux-req-middleware also returns a promise with the resolved action, giving you the ability to chain actions:

```javascript

  store.dispatch(actions.getUserList())
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
const ReduxReqMiddleware = reduxReqMiddleware();

//custom configuration
const ReduxReqMiddleware = reduxReqMiddleware({
  request: '_CALL',
  success: '_OK',
  error: '_KO'
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxReqMiddleware)
  )
)

``` 

## Projects using redux-req-middleware

- [react-base](https://github.com/atSistemas/react-base/ (atSistemas React/Redux Isomorphic Platform)


## License

MIT