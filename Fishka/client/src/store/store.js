import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingReducer from './slices/settingSlice'
import guideReducer from './slices/guideSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        setting: settingReducer,
        guide: guideReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;