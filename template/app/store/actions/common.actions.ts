import { IPWhoisApiResponse } from '$dto/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const IPWhoApi = createAsyncThunk('common/ipWhoApi', async (_, thunkApi) => {
    try {
        const response = await axios.get<IPWhoisApiResponse>('https://ipwho.is/');
        return response.data;
    } catch (error: any) {
        thunkApi.rejectWithValue(error.message);
    }
});
