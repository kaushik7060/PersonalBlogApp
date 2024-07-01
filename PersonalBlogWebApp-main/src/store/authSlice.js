import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: null,
        userData: null,
        loading: true,
        progress: 0,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        stopLoading: (state) => {
            state.loading = false;
            state.progress = 100;
        },
        setProgress: (state, action) => {
            state.progress = Number(action.payload);
        }
    }
});
export const {login, logout, stopLoading, setProgress} = authSlice.actions;