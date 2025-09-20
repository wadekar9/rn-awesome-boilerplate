import { configureStore } from '@reduxjs/toolkit';
import reducer from './redux.rootreducer';

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type ApplicationStateType = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
