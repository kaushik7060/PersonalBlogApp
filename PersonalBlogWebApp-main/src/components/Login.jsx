import React, { useRef, useState } from "react";
import { Input, Button } from ".";
import authService from "../appwrite/auth"
import { login, setProgress } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    async function handleLogin(event) {
        event.preventDefault();
        setError("");
        if (!/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(email)) {
            setError("Kindly Enter a valid email address..");
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
            setError("Use a password with at least 8 characters, including upper and lowercase letters, numbers, and special symbols.")
        }
        else {
            try {
                dispatch(setProgress(30));
                const session = await authService.logIn(email, password);
                dispatch(setProgress(60));
                if (session) {
                    const userData = await authService.getCurrentUser();
                    dispatch(login(userData));
                }
            }
            catch (error) {
                setError(error.message);
            }
            dispatch(setProgress(100));
        }
    }
    return (
        <>
        {error && <p className="text-red-500 self-center mt-20 mx-1 text-center absolute">{error}</p>}
        <form className="w-4/5 flex flex-col items-center justify-center my-20 shadow rounded-lg p-8 bg-white md:w-auto" onSubmit={handleLogin}>
            <Input
                type="text"
                placeholder="Enter Email.."
                value={email}
                setValue={setEmail}
                required = {true}
            />
            <Input
            type = "password"
            placeholder = "Enter Password.."
            value = {password}
            setValue = {setPassword}
            required = {true}
            iconRequired = {true}
            />
            <hr className="w-full border-black my-2" />
            <Button
                type="submit"
                title="Login"
            />
            <p className="my-3">don't have a account? <Link
            className="underline hover:no-underline"
            to="/signup">Sign Up</Link> now.</p>
        </form>
        </>
    )
}