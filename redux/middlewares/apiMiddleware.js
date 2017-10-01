export default function apiMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    // If action is thunk action, call it with dispatch passed down
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;

    // If action has no promise defined, treat it as normal action
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    return promise(client)
      .then(result => next({ ...rest, result, type: SUCCESS }))
      .catch(error => {
        console.error('API MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });
  };
}
