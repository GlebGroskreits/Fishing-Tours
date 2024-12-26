import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingReducer from './slices/settingSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        setting: settingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;