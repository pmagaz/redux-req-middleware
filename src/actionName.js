const getActionPrefix = action => {
  return action.substr(0, action.lastIndexOf('_'));
};

export { getActionPrefix };