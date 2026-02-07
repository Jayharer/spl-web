import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    auth: false,
}

const authCheckerSlice = createSlice({
    name: "authChecker",
    initialState: initialState,
    reducers: {
        authCheckerLoadSuccess: (state) => {
            state.auth = true
        },
    }

})

export const { authCheckerLoadSuccess } = authCheckerSlice.actions
export const authCheckerSelector = (state) => state.authChecker
export const authCheckerReducer = authCheckerSlice.reducer