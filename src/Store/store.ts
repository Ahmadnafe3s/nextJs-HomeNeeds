import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import userReducer from './Slice/userSlice';


export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
        }
    });

}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']