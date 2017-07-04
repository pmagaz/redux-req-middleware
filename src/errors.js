class RequestParamError extends Error {
  /* istanbul ignore next */
  constructor(name) {
    super();
    this.name = 'RequestParamError';
    this.message = `Request param of ${name} action should be a promise!`;
  }
}

export { RequestParamError };
