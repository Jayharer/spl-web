import { createSlice } from '@reduxjs/toolkit'
import { apiListCoupon } from './api'

export const initialState = {
    loading: false,
    hasError: false,
    couponList: []
}

const listCouponSlice = createSlice({
    name: "listCoupon",
    initialState: initialState,
    reducers: {
        listCouponLoading: (state) => {
            state.loading = true
        },
        listCouponLoadSuccess: (state, { payload }) => {
            state.loading = false
            state.hasError = false
            state.couponList = payload
        },
        listCouponLoadFailure: (state) => {
            state.loading = false
            state.hasError = true
        }

    }

})

export const { listCouponLoading, listCouponLoadSuccess, listCouponLoadFailure } = listCouponSlice.actions
export const listCouponSelector = (state) => state.listCoupon
export const listCouponReducer = listCouponSlice.reducer

export const listCouponLoadFlow = () => {

    return async (dispatch) => {
        dispatch(listCouponLoading())
        try {
            const listCoupon = await apiListCoupon()
            console.log(listCoupon)
            dispatch(listCouponLoadSuccess(listCoupon))
        } catch (error) {
            console.log(error)
            dispatch(listCouponLoadFailure())
        }
    }
}
