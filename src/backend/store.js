import { configureStore } from '@reduxjs/toolkit'

import { listCouponReducer } from './listCouponSlice'
import { listPlayerReducer } from './listPlayerSlice'
import { authCheckerReducer } from './authCheckerSlice'

export const store = configureStore({
    reducer: {
        coupon: listCouponReducer,
        player: listPlayerReducer,
        auth: authCheckerReducer,
    },
})