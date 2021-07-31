import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducerEnhancer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware];
    const enhancers = [applyMiddleware(...middlewares), monitorReducerEnhancer];

    return createStore(rootReducer, preloadedState, composeWithDevTools(...enhancers))
}