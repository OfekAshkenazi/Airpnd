import { combineReducers, createStore } from 'redux';

import { filterExpandedReducer } from './filter.expanded.reducer.js';
import { reviewReducer } from './review.reducer';
import { stayReducer } from './stay.reducer.js';
import { systemReducer } from './system.reducer';
import { userReducer } from './user.reducer.js';

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    filterExpandedModule: filterExpandedReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)




