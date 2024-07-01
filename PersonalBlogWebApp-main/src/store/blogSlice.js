import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: []
    },
    reducers: {
        updateBlogs: (state, action) => {
            state.blogs = action.payload;
        }
    }
})
export const {updateBlogs} = blogSlice.actions;