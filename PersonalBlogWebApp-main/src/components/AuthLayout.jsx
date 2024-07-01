import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AuthLayout({children, authentication = false}) {
    const loading = useSelector(state => state.auth.loading);
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading) {
            if (authentication && authStatus === false) {
                navigate("/login");
            }
            else if (!authentication && authStatus === true) {
                navigate("/");
            }
        }
    }, [authStatus, navigate]);
    return loading ? null : <>{children}</>
}