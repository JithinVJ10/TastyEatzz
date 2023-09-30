import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import adminSlice from "../slice/adminSlice";
import riderSlice from "../slice/riderSlice";

const store = configureStore({
    reducer:{
        user: userSlice,
        admin: adminSlice,
        rider: riderSlice,
    },
})


export default store