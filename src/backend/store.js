import { configureStore } from '@reduxjs/toolkit'

import {listCouponReducer} from './listCouponSlice'

export const store = configureStore({
    reducer: {
        coupon: listCouponReducer,
    },
})