import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import { Authorized } from './components/auth/Authorized.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route element={<App />} 
              path="/"
          >
            <Route element={<Authorized />}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Route>
      </>
  ));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
