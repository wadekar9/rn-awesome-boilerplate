import { createSlice } from '@reduxjs/toolkit';

const authUserSlice = createSlice({
    name: 'authUser',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
