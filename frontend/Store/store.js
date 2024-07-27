import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './Reducer/searchSlice';
// import authReducer from './reducers/authSlice';

export const store = configureStore({
    reducer: {
        searches: searchSlice,
    }
});