import React from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import {logout, setProgress} from "../store/authSlice"
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        dispatch(setProgress(60))
        authService.logOut().then(() => {
            dispatch(logout());
            dispatch(setProgress(100));
    }).catch((error) => console.log("error in logout", error));
    }
    return (
        <button
        onClick={handleLogout}
        className="bg-gray-800 text-white px-3 py-1 rounded-md font-light hover:bg-opacity-85">Log out</button>
    )
}