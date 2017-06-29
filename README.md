redux-req-middleware
====================


## Table of contents

1. [Introduction](#introduction)
2. [Example](#example)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
7. [License](License)

## Introduction

`redux-req-middleware` is a Redux Store middleware to handle Redux actions with a http request attached.

### Example

#### api.js

```javascript

export default {
  fetchUsers(url) {
    return fetch(url)
      .then(req => req.json())
      .catch(err => err) 
  }
}

``` 
Then, in your Redux action creators you can add your HTTP Request function usign the request param of the action:

```javascript

import api from '../api';

export function getPosts() {
  return {
    type: ActionTypes.USERS_REQUEST,
    request: api.fetchUsers()
  };
}
```
`redux-req-middleware` will dispatch (and return) a new action with a 'YourActionType_SUCCESS' if the request was successful or 'YourActionType_ERROR' if it was unsuccessful. Both the data and error will be returned in the  action payload. 


## Installation

```
$ npm install redux-api-middleware --save
```

## Configuration

By default, `redux-req-middleware` uses the following names for the three typicall http request states:
```
{
  request: '_REQUEST',
  success: '_SUCCESS',
  error: '_ERROR'
}
```

So if you your action type is "FOO" or "FOO_REQUEST" `redux-req-middleware` will dispatch (and return) a "FOO_SUCCESS" or "FOO_ERROR" action type by default.

You can pass an object configuration with your own names when you add the middleware to Redux Store; 

To use `redux-req-middleware` you need to add it as a Redux Store Middlware using default naming configuration or custom naming configuration:

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

## USAGE
  
`redux-req-middleware` will dispatch a new action with a SUCCESS or ERROR but also it will resolve the promise of your HTTP Request so, you can use it with the regular Redux flow, listening for this new action in the reducer or you can use it as a promise:

```javascript
  store.dispatch({
      type: 'DATA_REQUEST',
      request: api.fetchUsers()
    })
  .then(action => {
    /*{
      type: 'DATA_SUCCESS'
      payload: {...}
    }*/
  })
``` 


## License

MIT
