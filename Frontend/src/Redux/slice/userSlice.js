import {createSlice} from '@reduxjs/toolkit'

const userInfo = JSON.parse(localStorage.getItem('userData'))

// Structure of user data
export const initialState = {
    userCred: userInfo ? userInfo : null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userCred = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userCred = null;
            localStorage.removeItem("userData")
            localStorage.removeItem("token")
        },
    },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;