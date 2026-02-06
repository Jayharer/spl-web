import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './listPlayerSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})