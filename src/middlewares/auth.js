const authRedirectMiddleware = store => next => (action) => {
  next(action);
};

export default authRedirectMiddleware;
