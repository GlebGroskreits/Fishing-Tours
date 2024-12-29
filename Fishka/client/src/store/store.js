import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingReducer from './slices/settingSlice'
import guideReducer from './slices/guideSlice'
import modalReducer from './slices/modalSlice'
import tourReducer  from './slices/tourSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        setting: settingReducer,
        guide: guideReducer,
        modal: modalReducer,
        tour: tourReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;