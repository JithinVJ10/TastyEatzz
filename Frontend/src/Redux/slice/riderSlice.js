import {createSlice} from '@reduxjs/toolkit'

const rider = JSON.parse(localStorage.getItem('riderInfo'))

export const initialState = {
    riderCred : rider? rider : null
}


export const riderSlice = createSlice({
    name: 'rider',
    initialState,
    reducers:{
        setRiderInfo: (state, action) => {
            state.riderCred = action.payload;
            localStorage.setItem("riderInfo", JSON.stringify(action.payload));
        },
        RiderLogout: (state) => {
            state.riderCred = null;
            localStorage.removeItem('riderToken')
            localStorage.removeItem('riderInfo')
        },
    }
})

export const {setRiderInfo, RiderLogout} = riderSlice.actions
export default riderSlice.reducer