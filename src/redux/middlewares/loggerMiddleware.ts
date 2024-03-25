import { Middleware, Dispatch, AnyAction } from 'redux';

const loggerMiddleware: Middleware<{}, any, Dispatch<AnyAction>> =
  (store) => (next) => (action) => {
    console.groupCollapsed('Dispatching action:', action.type);
    console.log('Previous state:', store.getState());
    console.log('Action:', action);
    next(action);
    console.log('Next state:', store.getState());
    console.groupEnd();
  };

export default loggerMiddleware;
