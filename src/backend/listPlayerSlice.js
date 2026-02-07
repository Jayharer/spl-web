import { createSlice } from '@reduxjs/toolkit'
import { apiListPlayers } from './api'

export const initialState = {
    loading: false,
    hasError: false,
    playerList: []
}

const listPlayerSlice = createSlice({
    name: "listPlayer",
    initialState: initialState,
    reducers: {
        listPlayerLoading: (state) => {
            state.loading = true
        },
        listPlayerLoadSuccess: (state, { payload }) => {
            state.loading = false
            state.hasError = false
            state.playerList = payload
        },
        listPlayerLoadFailure: (state) => {
            state.loading = false
            state.hasError = true
        }

    }

})

export const { listPlayerLoading, listPlayerLoadSuccess, listPlayerLoadFailure } = listPlayerSlice.actions
export const listPlayerSelector = (state) => state.listPlayer
export const listPlayerReducer = listPlayerSlice.reducer

export const listPlayerLoadFlow = () => {

    return async (dispatch) => {
        dispatch(listPlayerLoading())
        try {
            const resp = await apiListPlayers()
            console.log(resp)
            const tableData = resp.data.data.map((item, index) => ({
                ...item,
                key: index,
            }));
            dispatch(listPlayerLoadSuccess(tableData))
        } catch (error) {
            console.log(error)
            dispatch(listPlayerLoadFailure())
        }
    }
}
