import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import adminSlice from "../slice/adminSlice";
import riderSlice from "../slice/riderSlice";
import hotelSlice from "../slice/hotelSlice";

const store = configureStore({
    reducer:{
        user: userSlice,
        admin: adminSlice,
        rider: riderSlice,
        hotel : hotelSlice,
    },
})


export default store