import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from "./store/store.js"
import Home from "./pages/Home.jsx"
import AddPost from "./pages/AddPost.jsx"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Singup from './components/Singup.jsx'
import ViewPost from './pages/ViewPost.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={
        <AuthLayout authentication={true}>
          <Home />
        </AuthLayout>
      } />
      <Route path='/:slug' element={<ViewPost />} />
      <Route path='/login' element={
        <AuthLayout>
          <Login />
        </AuthLayout>} />
      <Route path='/signup' element={
        <AuthLayout>
          <Singup />
        </AuthLayout>} />
      <Route path='/addpost/:id' element={
        <AuthLayout authentication={true}>
          <AddPost />
        </AuthLayout>} />
      </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
