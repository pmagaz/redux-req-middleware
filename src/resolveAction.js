const resolveAction = (action, response, options, result) => {

  const nextState = (result) ? options.success : options.error;
  const actionPrefix = action.type.replace(options.request, '');

  return {
    type: `${actionPrefix}${nextState}`, 
    payload: response
  };
};

export { resolveAction };
