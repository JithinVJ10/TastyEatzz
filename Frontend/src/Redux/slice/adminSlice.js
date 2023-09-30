import {createSlice} from '@reduxjs/toolkit'

const admin = JSON.parse(localStorage.getItem('adminInfo'))

export const initialState = {
    adminCred : admin? admin:null
}


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        setAdminInfo: (state, action) => {
            state.adminCred = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
        AdminLogout: (state) => {
            state.adminCred = null;
            localStorage.removeItem('adminToken')
            localStorage.removeItem('adminInfo')
        },
    }
})

export const {setAdminInfo, AdminLogout} = adminSlice.actions
export default adminSlice.reducer
