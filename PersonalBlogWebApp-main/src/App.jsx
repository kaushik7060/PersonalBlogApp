import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth"
import { login, logout, setProgress } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import Login from "./components/Login";
import PostCard from "./components/PostCard";
import Singup from "./components/Singup";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { stopLoading } from "./store/authSlice"
import LoadingBar from "react-top-loading-bar";
import { updateBlogs } from "./store/blogSlice";
import dbService from "./appwrite/database";
function App() {
  const location = useLocation();
  const dispatcher = useDispatch();
  const progress = useSelector(state => state.auth.progress);
  const loading = useSelector(state => state.auth.loading);
  useEffect(() => {
    dispatcher(setProgress(10));
    let getInfo = localStorage.getItem("cookieFallback");
    if (getInfo) {
      getInfo = JSON.parse(getInfo);
      if (getInfo.a_session_664cc0bf00260dacc8ff) {
        dispatcher(setProgress(30));
        authService.getCurrentUser().then((data) => {
          dispatcher(login(data));
          dispatcher(setProgress(60));
          dbService.getPosts().then((value) => {
            dispatcher(updateBlogs(value.documents.reverse()));
            dispatcher(setProgress(100));
            dispatcher(stopLoading());
          });
        });
      }
      else {
        dispatcher(logout());
        dispatcher(stopLoading());
      }
    }
    else {
      dispatcher(logout());
      dispatcher(stopLoading());
    }
  }, [location]);
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => dispatcher(setProgress(0))}
      />
      <Header />
      <div className="w-full mb-14 flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
