// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import bookTagReducer from './booktagReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    bookTagReducer,
    bookReducer
});

export default rootReducer;
