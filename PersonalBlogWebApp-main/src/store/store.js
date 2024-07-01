import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { blogSlice } from "./blogSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        blog: blogSlice.reducer
    }
})