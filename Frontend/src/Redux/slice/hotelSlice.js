import { createSlice } from "@reduxjs/toolkit";

const hotel = JSON.parse(localStorage.getItem('hotelInfo'))

const initialState = {
    hotelCred :hotel? hotel : null
}

export const hotelSlice = createSlice({
    name:'hotel',
    initialState,
    reducers:{
        setHotelInfo: (state,action)=>{
            state.hotelCred = action.payload
            localStorage.setItem(action.payload,'hotelInfo')
        },
        hotelLogout:(state)=>{
            state.hotelCred= null
            localStorage.removeItem('hotelInfo')
            localStorage.removeItem('hotelToken')
        }
    }
})

export const {setHotelInfo, hotelLogout} = hotelSlice.actions
export default hotelSlice.reducer