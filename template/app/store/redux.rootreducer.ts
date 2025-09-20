import { combineReducers } from '@reduxjs/toolkit';
import { authUserReducer } from './slices';

const reducer = combineReducers({
    user: authUserReducer,
});

export default reducer;
